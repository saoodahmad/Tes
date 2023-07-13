import Tes from '../Tes'

import Token from '../grammar/lexer_grammar/Token'
import TokenKind from '../grammar/lexer_grammar/TokenType'

import InterpreterError from './InterpreterError'

import { Minimum, Maximum, Absolute } from './globals/Functions'

import Environment from './environment/Environment'
import Function from '../grammar/interpreter_grammar/Function'
import Break from '../grammar/interpreter_grammar/Break'
import Return from '../grammar/interpreter_grammar/Return'

import Program from '../grammar/parser_grammer/Program'

import Declaration from '../grammar/parser_grammer/declaration/Declaration'
import VariableDeclaration from '../grammar/parser_grammer/declaration/VariableDeclaration'
import FunctionDeclaration from '../grammar/parser_grammer/declaration/FunctionDeclaration'

import PrintStatement from '../grammar/parser_grammer/statement/PrintStatement'
import PrintLineStatement from '../grammar/parser_grammer/statement/PrintLineStatement'
import ExpressionStatement from '../grammar/parser_grammer/statement/ExpressionStatement'
import BlockStatement from '../grammar/parser_grammer/statement/BlockStatement'
import IfStatement from '../grammar/parser_grammer/statement/IfStatement'
import WhileStatment from '../grammar/parser_grammer/statement/WhileStatement'
import BreakStatement from '../grammar/parser_grammer/statement/BreakStatement'
import ForStatment from '../grammar/parser_grammer/statement/ForStatement'
import ContinueStatement from '../grammar/parser_grammer/statement/ContinueStatement'
import ReturnStatement from '../grammar/parser_grammer/statement/ReturnStatement'

import Expression from '../grammar/parser_grammer/expression/Expression'
import BinaryExpression from '../grammar/parser_grammer/expression/BinaryExpression'
import GroupingExpression from '../grammar/parser_grammer/expression/GroupingExpression'
import LiteralExpression from '../grammar/parser_grammer/expression/LiteralExpression'
import UnaryExpression from '../grammar/parser_grammer/expression/UnaryExpression'
import VariableExpression from '../grammar/parser_grammer/expression/VariableExpression'
import AssignExpression from '../grammar/parser_grammer/expression/AssignExpression'
import LogicalExpression from '../grammar/parser_grammer/expression/LogicalExpression'
import CallExpression from '../grammar/parser_grammer/expression/CallExpression'
import Callable from '../grammar/interpreter_grammar/Callable'

import visitor from '../grammar/parser_grammer/declaration/Visitor'

export default class Interpreter implements visitor<unknown> {
    readonly globals = new Environment()

    private environment: Environment = this.globals

    private skip = false

    private readonly program: Program

    constructor(program: Program) {
        this.program = program
        this.globals.define('min', new Minimum())
        this.globals.define('max', new Maximum())
        this.globals.define('abs', new Absolute())
    }

    interpret() {
        try {
            this.program.declarations.forEach((declaration) => {
                this.execute(declaration)
            })
        } catch (error) {
            Tes.reportInterpreterError(error)
        }
    }

    visitFunctionDeclaration(declaration: FunctionDeclaration): unknown {
        const { name } = declaration

        if (this.globals.peek(name) !== false) {
            return this.error(name, `${name.lexeme} is an inbuilt function.`)
        }

        const func = new Function(declaration)

        this.environment.define(name.lexeme, func)

        return null
    }

    visitVariableDeclaration(declaration: VariableDeclaration): unknown {
        const { name, initializer } = declaration

        let value: unknown = null

        if (initializer != null) {
            value = this.evaluate(initializer)
        }

        this.environment.defineVariable(name, value)

        return null
    }

    visitExpressionStatment(stmt: ExpressionStatement): unknown {
        this.evaluate(stmt.expression)
        return null
    }

    visitForStatement(statement: ForStatment): unknown {
        try {
            if (statement.initializer) {
                this.execute(statement.initializer)
            }

            while (this.isTruthy(this.evaluate(statement.condition))) {
                this.execute(statement.body)
                this.skip = false
                if (statement.increment) {
                    this.evaluate(statement.increment)
                }
            }
        } catch (err: unknown) {
            if (err instanceof Break) {
                // catch and do nothing
            } else if (err instanceof InterpreterError) {
                Tes.reportInterpreterError(err)
            } else if (err instanceof Return) {
                throw new Return(err.returnValue)
            }
        }

        return null
    }

    visitIfStatement(statement: IfStatement): unknown {
        if (this.isTruthy(this.evaluate(statement.condition))) {
            this.execute(statement.thenBranch)
        } else if (statement.elseBranch != null) {
            this.execute(statement.elseBranch)
        }

        return null
    }

    visitPrintStatement(stmt: PrintStatement): unknown {
        const value = this.evaluate(stmt.expression)
        Tes.output += `${value}`
        return null
    }

    visitPrintLineStatement(stmt: PrintLineStatement): unknown {
        const value = this.evaluate(stmt.expression)
        Tes.output += `${value}\n`
        return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    visitBreakStatement(_statement: BreakStatement): unknown {
        throw new Break()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    visitContinueStatement(_statement: ContinueStatement): unknown {
        this.skip = true
        return null
    }

    visitReturnStatement(statement: ReturnStatement): unknown {
        let value = null

        if (statement.value != null) value = this.evaluate(statement.value)

        throw new Return(value)
    }

    visitWhileStatement(statement: WhileStatment): unknown {
        try {
            while (this.isTruthy(this.evaluate(statement.condition))) {
                this.execute(statement.body)
                this.skip = false
            }
        } catch (err: unknown) {
            if (err instanceof Break) {
                // catch and do nothing
            } else if (err instanceof InterpreterError) {
                Tes.reportInterpreterError(err)
            } else if (err instanceof Return) {
                throw new Return(err.returnValue)
            }
        }

        return null
    }

    visitBlockStatement(statement: BlockStatement): unknown {
        this.executeBlock(
            statement.declarations,
            new Environment(this.environment)
        )
        return null
    }

    visitCallExpression(expression: CallExpression): unknown {
        const callee = this.evaluate(expression.callee)

        const callArguments: unknown[] = []

        expression.callArguments.forEach((callArgument) => {
            callArguments.push(this.evaluate(callArgument))
        })

        if (!this.isCallable(callee)) {
            return this.error(
                expression.parenthesis,
                'Can only call functions.'
            )
        }

        const func: Callable = callee

        if (callArguments.length !== func.arity()) {
            return this.error(
                expression.parenthesis,
                `Expected ${func.arity()} arguments but got ${
                    callArguments.length
                }.`
            )
        }

        return func.call(this, callArguments)
    }

    isCallable(calle: Expression): boolean {
        try {
            return 'call' in calle
        } catch (err) {
            return false
        }
    }

    visitAssignExpression(expression: AssignExpression): unknown {
        const value = this.evaluate(expression.value)
        this.environment.assign(expression.name, value)

        return value
    }

    visitVariableExpression(expression: VariableExpression): unknown {
        return this.environment.get(expression.name)
    }

    visitLogicalExpression(expression: LogicalExpression): unknown {
        const left = this.evaluate(expression.left)

        if (expression.operator.type === TokenKind.OR) {
            if (this.isTruthy(left)) return left
        } else if (!this.isTruthy(left)) return left

        return this.evaluate(expression.right)
    }

    visitBinaryExpression(expression: BinaryExpression) {
        const left = this.evaluate(expression.left)

        const right = this.evaluate(expression.right)

        switch (expression.operator.type) {
            case TokenKind.GREATER:
                this.checkNumberOperands(expression.operator, left, right)
                return Number(left) > Number(right)
            case TokenKind.GREATER_EQUAL:
                this.checkNumberOperands(expression.operator, left, right)
                return Number(left) >= Number(right)
            case TokenKind.LESS:
                this.checkNumberOperands(expression.operator, left, right)
                return Number(left) < Number(right)
            case TokenKind.LESS_EQUAL:
                this.checkNumberOperands(expression.operator, left, right)
                return Number(left) <= Number(right)
            case TokenKind.MINUS:
                this.checkNumberOperand(expression.operator, right)
                return Number(left) - Number(right)
            case TokenKind.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return left + right
                }

                if (typeof left === 'string' && typeof right === 'string') {
                    return left + right
                }

                return this.error(
                    expression.operator,
                    'Operands must be two numbers or two strings.'
                )
            case TokenKind.SLASH:
                this.checkNumberOperands(expression.operator, left, right)
                if (right === 0) {
                    return this.error(
                        expression.operator,
                        'Cannot divide by zero.'
                    )
                }
                return Number(left) / Number(right)
            case TokenKind.STAR:
                this.checkNumberOperands(expression.operator, left, right)
                return Number(left) * Number(right)
            case TokenKind.MODULO:
                this.checkNumberOperands(expression.operator, left, right)
                return Number(left) % Number(right)
            case TokenKind.BANG_EQUAL:
                return !this.isEqual(left, right)
            case TokenKind.EQUAL_EQUAL:
                return this.isEqual(left, right)
            default:
        }

        return null
    }

    visitUnaryExpression(expression: UnaryExpression) {
        const right = this.evaluate(expression.right)

        switch (expression.operator.type) {
            case TokenKind.BANG:
                return !this.isTruthy(right)

            case TokenKind.MINUS:
                return -parseFloat(right)
            default:
        }

        return null
    }

    checkNumberOperand(operator: Token, operand: unknown): unknown {
        if (!Number.isNaN(operand)) return null

        return this.error(operator, 'Operand must be a number.')
    }

    checkNumberOperands(
        operator: Token,
        left: unknown,
        right: unknown
    ): unknown {
        if (!Number.isNaN(left) && !Number.isNaN(right)) return null
        return this.error(operator, 'Operands must be a number.')
    }

    visitLiteralExpression(expression: LiteralExpression): unknown {
        return expression.value
    }

    visitGroupingExpression(expression: GroupingExpression) {
        return this.evaluate(expression.expression)
    }

    private evaluate(expression: Expression) {
        return expression.accept(this)
    }

    private execute(declaration: Declaration) {
        if (this.skip) return null

        return declaration.accept(this)
    }

    executeBlock(declarations: Declaration[], environment: Environment) {
        const previous = this.environment

        try {
            this.environment = environment

            declarations.forEach((declaration) => {
                this.execute(declaration)
            })
        } finally {
            this.environment = previous
        }
    }

    private isTruthy(object: unknown): boolean {
        if (object == null) return false

        if (object === false) return false

        return true
    }

    private isEqual(left: unknown, right: unknown): boolean {
        if (left !== right) {
            return false
        }

        return true
    }

    error(token: Token, message: string) {
        throw new InterpreterError(token, message)
    }
}

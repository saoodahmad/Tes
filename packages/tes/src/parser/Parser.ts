import Tes from '../Tes'
import Token from '../grammar/lexer_grammar/Token'
import TokenKind from '../grammar/lexer_grammar/TokenType'

import ParseError from './ParseError'

import Program from '../grammar/parser_grammer/Program'

import Declaration from '../grammar/parser_grammer/declaration/Declaration'
import VariableDeclaration from '../grammar/parser_grammer/declaration/VariableDeclaration'
import FunctionDeclaration from '../grammar/parser_grammer/declaration/FunctionDeclaration'

import Statement from '../grammar/parser_grammer/statement/Statement'
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

export default class Parser {
    tokens = new Array<Token>()

    current = 0

    constructor(tokens: Token[]) {
        this.tokens = tokens
    }

    nestedLoopCount = 0

    nestedFunctionCount = 0

    parse(): Program {
        try {
            const declarations: Declaration[] = []

            while (!this.isAtEnd()) {
                declarations.push(this.declaration())
            }
            return new Program(declarations)
        } catch (error) {
            Tes.reportParserError(error.token, error.message)
            return null
        }
    }

    declaration(): Declaration {
        if (this.match([TokenKind.FUN])) {
            return this.functionDeclaration()
        }

        if (this.match([TokenKind.VAR])) {
            return this.variableDeclaration()
        }

        return this.statement()
    }

    functionDeclaration(): FunctionDeclaration {
        const name = this.consume(
            TokenKind.IDENTIFIER,
            "Expected identifier (function name) after 'fun'."
        )

        this.consume(
            TokenKind.LEFT_PAREN,
            "Expected '(' after identifier (function name)."
        )

        const formalArguments: Token[] = []

        if (!this.check(TokenKind.RIGHT_PAREN)) {
            do {
                formalArguments.push(
                    this.consume(
                        TokenKind.IDENTIFIER,
                        "Expected identifier(s) (argument(s)) after '('."
                    )
                )
            } while (this.match([TokenKind.COMMA]))
        }

        this.consume(
            TokenKind.RIGHT_PAREN,
            "Expected ')' at end of last identifier (argument)."
        )

        this.consume(TokenKind.LEFT_BRACE, 'Expected function body.')

        try {
            this.nestedFunctionCount++

            const body = this.blockStatement()

            return new FunctionDeclaration(name, formalArguments, body)
        } finally {
            this.nestedFunctionCount--
        }
    }

    variableDeclaration(): VariableDeclaration {
        const name = this.consume(
            TokenKind.IDENTIFIER,
            "Expected identifier (variable name) after 'var'."
        )

        let initializer: Expression = null

        if (this.match([TokenKind.EQUAL])) {
            initializer = this.expression()
        }

        this.consume(
            TokenKind.SEMICOLON,
            "Expected ';' after variable declaration."
        )

        return new VariableDeclaration(name, initializer)
    }

    statement(): Statement {
        if (this.match([TokenKind.FOR])) {
            return this.forStatement()
        }

        if (this.match([TokenKind.IF])) {
            return this.ifStatment()
        }

        if (this.match([TokenKind.PRINT])) {
            return this.printStatement()
        }

        if (this.match([TokenKind.PRINTLN])) {
            return this.printLineStatement()
        }

        if (this.match([TokenKind.BREAK])) {
            return this.breakStatement()
        }

        if (this.match([TokenKind.CONTINUE])) {
            return this.continueStatement()
        }

        if (this.match([TokenKind.RETURN])) {
            return this.returnStatement()
        }

        if (this.match([TokenKind.WHILE])) {
            return this.WhileStatment()
        }

        if (this.match([TokenKind.LEFT_BRACE])) {
            return this.blockStatement()
        }

        return this.expressionStatment()
    }

    forStatement(): ForStatment {
        this.consume(TokenKind.LEFT_PAREN, "Expected '(' after 'for'.")

        let initializer = null

        if (!this.match([TokenKind.SEMICOLON])) {
            if (this.match([TokenKind.VAR])) {
                initializer = this.variableDeclaration()
            } else {
                initializer = this.expressionStatment()
            }
        }

        let condition = null

        if (!this.check(TokenKind.SEMICOLON)) {
            condition = this.expression()
        } else {
            condition = new LiteralExpression(true)
        }

        this.consume(TokenKind.SEMICOLON, "Expected ';' after loop condition.")

        let increment = null

        if (!this.check(TokenKind.RIGHT_PAREN)) {
            increment = this.expression()
        }

        this.consume(
            TokenKind.RIGHT_PAREN,
            "Expected ')' after increment condition."
        )

        try {
            this.nestedLoopCount++

            const body = this.statement()

            return new ForStatment(initializer, condition, increment, body)
        } finally {
            this.nestedLoopCount--
        }
    }

    ifStatment(): IfStatement {
        this.consume(TokenKind.LEFT_PAREN, "Expected '(' after 'if'.")

        const condition = this.expression()

        this.consume(TokenKind.RIGHT_PAREN, "Expected ')' after if condition.")

        const thenBranch = this.statement()

        let elseBranch = null

        if (this.match([TokenKind.ELSE])) {
            elseBranch = this.statement()
        }

        return new IfStatement(condition, thenBranch, elseBranch)
    }

    printStatement(): PrintStatement {
        const value: Expression = this.expression()

        this.consume(TokenKind.SEMICOLON, "Expected ';' after expression.")

        return new PrintStatement(value)
    }

    printLineStatement(): PrintLineStatement {
        const value: Expression = this.expression()

        this.consume(TokenKind.SEMICOLON, "Expected ';' after expression.")

        return new PrintLineStatement(value)
    }

    breakStatement(): BreakStatement {
        const token = this.previous()

        this.consume(TokenKind.SEMICOLON, "Expected ';' after 'break'.")

        if (this.nestedLoopCount === 0) {
            this.error(token, "Unexpected use of 'break'.")
            return null
        }

        return new BreakStatement(token)
    }

    continueStatement(): ContinueStatement {
        const token = this.previous()

        this.consume(TokenKind.SEMICOLON, "Expected ';' after 'continue'.")

        if (this.nestedLoopCount === 0) {
            this.error(token, "Unexpected use of 'continue'.")
            return null
        }

        return new ContinueStatement(token)
    }

    returnStatement(): ReturnStatement {
        const token = this.previous()

        let value: Expression = null

        if (!this.check(TokenKind.SEMICOLON)) {
            value = this.expression()
        }

        this.consume(TokenKind.SEMICOLON, "Expected ';' at end of return.")

        if (this.nestedFunctionCount === 0) {
            this.error(token, "Unexpected use of 'return'.")

            return null
        }

        return new ReturnStatement(token, value)
    }

    WhileStatment(): WhileStatment {
        this.consume(TokenKind.LEFT_PAREN, "Expected '(' after 'while'.")

        const condition = this.expression()

        this.consume(
            TokenKind.RIGHT_PAREN,
            "Expected ')' after expression (condition)."
        )

        try {
            this.nestedLoopCount++
            const body = this.statement()
            return new WhileStatment(condition, body)
        } finally {
            this.nestedLoopCount--
        }
    }

    blockStatement(): BlockStatement {
        const declarations: Declaration[] = []

        while (!this.check(TokenKind.RIGHT_BRACE) && !this.isAtEnd()) {
            declarations.push(this.declaration())
        }

        this.consume(
            TokenKind.RIGHT_BRACE,
            "Expected '}' at the end of body or block statement."
        )

        return new BlockStatement(declarations)
    }

    expressionStatment(): ExpressionStatement {
        const value: Expression = this.expression()

        this.consume(TokenKind.SEMICOLON, "Expected ';' at end of  expression.")

        return new ExpressionStatement(value)
    }

    expression(): Expression {
        return this.assignment()
    }

    assignment(): Expression {
        const expr = this.or()

        if (this.match([TokenKind.EQUAL])) {
            const equals: Token = this.previous()

            const value: Expression = this.assignment()

            if (expr instanceof VariableExpression) {
                return new AssignExpression(expr.name, value)
            }

            this.error(equals, 'Invalid assignemt target.')

            return null
        }

        return expr
    }

    or(): Expression {
        let left = this.and()

        while (this.match([TokenKind.OR])) {
            const operator = this.previous()

            const right = this.and()

            left = new LogicalExpression(left, operator, right)
        }

        return left
    }

    and(): Expression {
        let left = this.equality()

        while (this.match([TokenKind.AND])) {
            const operator = this.previous()

            const right = this.and()

            left = new LogicalExpression(left, operator, right)
        }

        return left
    }

    equality(): Expression {
        let expr = this.comparison()

        while (this.match([TokenKind.BANG_EQUAL, TokenKind.EQUAL_EQUAL])) {
            const operator = this.previous()

            const right = this.comparison()

            expr = new BinaryExpression(expr, operator, right)
        }

        return expr
    }

    comparison(): Expression {
        let expr = this.term()

        while (
            this.match([
                TokenKind.GREATER,
                TokenKind.GREATER_EQUAL,
                TokenKind.LESS,
                TokenKind.LESS_EQUAL,
            ])
        ) {
            const operator = this.previous()

            const right = this.term()

            expr = new BinaryExpression(expr, operator, right)
        }

        return expr
    }

    term(): Expression {
        let expr = this.factor()

        while (this.match([TokenKind.PLUS, TokenKind.MINUS])) {
            const operator = this.previous()

            const right = this.factor()

            expr = new BinaryExpression(expr, operator, right)
        }

        return expr
    }

    factor(): Expression {
        let expr = this.unary()
        while (
            this.match([TokenKind.SLASH, TokenKind.STAR, TokenKind.MODULO])
        ) {
            const operator = this.previous()

            const right = this.unary()

            expr = new BinaryExpression(expr, operator, right)
        }

        return expr
    }

    unary(): Expression {
        if (this.match([TokenKind.BANG, TokenKind.MINUS])) {
            const operator = this.previous()

            const expr = this.unary()

            return new UnaryExpression(operator, expr)
        }

        return this.call()
    }

    call(): Expression {
        let expr = this.primary()

        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (this.match([TokenKind.LEFT_PAREN])) {
                expr = this.finishCall(expr)
            } else {
                break
            }
        }

        return expr
    }

    finishCall(callee: Expression): CallExpression {
        const callArguments: Expression[] = []

        if (!this.check(TokenKind.RIGHT_PAREN)) {
            do {
                callArguments.push(this.expression())
            } while (this.match([TokenKind.COMMA]))
        }

        const closingParan = this.consume(
            TokenKind.RIGHT_PAREN,
            "Expected ')' after arguments."
        )

        if (callArguments.length > 10) {
            this.error(this.peek(), 'Too many arguments, max allowed is 10.')
            return null
        }

        return new CallExpression(callee, closingParan, callArguments)
    }

    primary(): Expression {
        if (this.match([TokenKind.FALSE])) {
            return new LiteralExpression(false)
        }

        if (this.match([TokenKind.TRUE])) {
            return new LiteralExpression(true)
        }

        if (this.match([TokenKind.NIL])) {
            return new LiteralExpression(null)
        }

        if (this.match([TokenKind.NUMBER, TokenKind.STRING])) {
            return new LiteralExpression(this.previous().literal)
        }

        if (this.match([TokenKind.IDENTIFIER])) {
            return new VariableExpression(this.previous())
        }

        if (this.match([TokenKind.LEFT_PAREN])) {
            const expr = this.expression()
            this.consume(
                TokenKind.RIGHT_PAREN,
                "Expected ')' after expression."
            )
            return new GroupingExpression(expr)
        }

        this.error(this.peek(), 'Expected expression.')

        return null
    }

    match(tokenKinds: TokenKind[]): boolean {
        for (let i = 0; i < tokenKinds.length; i++) {
            if (this.check(tokenKinds[i])) {
                this.advance()
                return true
            }
        }

        return false
    }

    consume(type: TokenKind, message: string): Token {
        if (this.check(type)) return this.advance()

        this.error(this.peek(), message)
        return null
    }

    check(type: TokenKind): boolean {
        if (this.isAtEnd()) return false

        return this.peek().type === type
    }

    advance(): Token {
        if (!this.isAtEnd()) this.current++
        return this.previous()
    }

    isAtEnd(): boolean {
        return this.peek().type === TokenKind.EOF
    }

    peek(): Token {
        return this.tokens[this.current]
    }

    previous(): Token {
        return this.tokens[this.current - 1]
    }

    error(token: Token, message: string) {
        throw new ParseError(token, message)
    }
}

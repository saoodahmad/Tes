import Environment from '../../interpreter/environment/Environment'
import FunctionDeclaration from '../parser_grammer/declaration/FunctionDeclaration'
import Callable from './Callable'
import Interpreter from '../../interpreter/Interpreter'
import Return from './Return'

export default class Function implements Callable {
    private readonly declaration: FunctionDeclaration

    constructor(declaration: FunctionDeclaration) {
        this.declaration = declaration
    }

    arity(): number {
        return this.declaration.formalArguments.length
    }

    call(interpreter: Interpreter, callArguments: unknown[]): unknown {
        const environment = new Environment(interpreter.globals)

        this.declaration.formalArguments.forEach((formalArgument, idx) => {
            environment.define(formalArgument.lexeme, callArguments[idx])
        })

        try {
            interpreter.executeBlock(
                this.declaration.body.declarations,
                environment
            )
        } catch (error) {
            if (error instanceof Return) {
                return error.returnValue
            }
        }

        return null
    }
}

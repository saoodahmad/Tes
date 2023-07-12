import Token from '../grammar/lexer_grammar/Token'

export default class InterpreterError extends Error {
    token: Token

    constructor(token: Token, message: string) {
        super(message)
        this.token = token
    }
}

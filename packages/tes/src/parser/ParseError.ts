import Token from '../grammar/lexer_grammar/Token'

export default class ParseError extends Error {
    token: Token

    message: string

    constructor(token: Token, message: string) {
        super(message)
        this.token = token
        this.message = message
    }
}

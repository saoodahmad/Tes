import Lexer from './lexer/Lexer'
import Token from './grammar/lexer_grammar/Token'

class Tes {
    static hasLexerError = false

    static output = ''

    static error = ''

    static tokens: Token[] = []

    static report(line: number, where: string, message: string) {
        Tes.error += `${`[Line ${line}] ${Tes.getErrorType()} Error ${where}: ${message}`}\n`
    }

    static getErrorType(): string {
        if (Tes.hasLexerError) {
            return 'Lexer'
        }

        return ''
    }

    static reportLexicalError(line: number, message: string) {
        Tes.hasLexerError = true
        this.report(line, '', message)
    }

    static run(source: string) {
        const lexer: Lexer = new Lexer(source)

        const tokens: Array<Token> = lexer.lex()

        if (Tes.hasLexerError) return

        Tes.tokens = tokens
    }

    static reset() {
        Tes.hasLexerError = false
        Tes.error = ''
        Tes.output = ''
        Tes.tokens = []
    }
}

export default Tes

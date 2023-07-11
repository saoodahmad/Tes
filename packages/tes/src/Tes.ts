import Lexer from './lexer/Lexer'
import Token from './grammar/lexer_grammar/Token'
import TokenKind from './grammar/lexer_grammar/TokenType'
import Program from './grammar/parser_grammer/Program'
import Parser from './parser/Parser'

class Tes {
    static hasLexerError = false

    static hasParserError = false

    static output = ''

    static error = ''

    static report(line: number, where: string, message: string) {
        Tes.error += `${`[Line ${line}] ${Tes.getErrorType()} Error ${where}: ${message}`}\n`
    }

    static getErrorType(): string {
        if (Tes.hasLexerError) {
            return 'Lexer'
        }

        if (Tes.hasParserError) {
            return 'Parser'
        }

        return ''
    }

    static reportLexerError(line: number, message: string) {
        Tes.hasLexerError = true
        this.report(line, '', message)
    }

    static reportParserError(token: Token, message: string): void {
        Tes.hasParserError = true
        if (token.type === TokenKind.EOF) {
            this.report(token.line, 'at end', message)
        } else {
            this.report(token.line, `at '${token.lexeme}'`, message)
        }
    }

    static run(source: string) {
        const lexer: Lexer = new Lexer(source)

        const tokens: Array<Token> = lexer.lex()

        if (Tes.hasLexerError) return

        const parser = new Parser(tokens)

        const program: Program = parser.parse()

        if (Tes.hasParserError) return

        console.log(program)
    }

    static reset() {
        Tes.hasLexerError = false
        Tes.hasParserError = false
        Tes.error = ''
        Tes.output = ''
    }
}

export default Tes

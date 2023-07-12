import Lexer from './lexer/Lexer'
import Token from './grammar/lexer_grammar/Token'
import TokenKind from './grammar/lexer_grammar/TokenType'
import Program from './grammar/parser_grammer/Program'
import Parser from './parser/Parser'
import InterpreterError from './interpreter/InterpreterError'
import Interpreter from './interpreter/Interpreter'

class Tes {
    static hasLexerError = false

    static hasParserError = false

    static hasInterpreterError = false

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

        if (Tes.hasInterpreterError) {
            return 'Interpreter'
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

    static reportInpterpreterError(error: InterpreterError) {
        Tes.hasInterpreterError = true
        this.report(error.token.line, '', error.message)
    }

    static run(source: string) {
        const lexer: Lexer = new Lexer(source)

        const tokens: Array<Token> = lexer.lex()

        if (Tes.hasLexerError) return

        const parser = new Parser(tokens)

        const program: Program = parser.parse()

        if (Tes.hasParserError) return

        const interpreter = new Interpreter(program)

        interpreter.interpret()
    }

    static reset() {
        Tes.hasLexerError = false
        Tes.hasParserError = false
        Tes.hasInterpreterError = false
        Tes.error = ''
        Tes.output = ''
    }
}

export default Tes

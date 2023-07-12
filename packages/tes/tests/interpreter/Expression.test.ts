import Tes from '../../src/Tes'
import Lexer from '../../src/lexer/Lexer'
import Parser from '../../src/parser/Parser'
import Interpreter from '../../src/interpreter/Interpreter'

describe('Expression tests', () => {
    describe('Given: Correct program', () => {
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                print -1 + 2 - 3 * 4 % 5 / 1;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe('-1')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                print -1 + (2 - 3) * 4 % 5 / 1;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe('-5')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                println 1 >= 2;
                println 1 > 2;
                println 1 <= 2;
                println 1 < 2;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe('false\nfalse\ntrue\ntrue')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                println 2 == 2;
                println 1 != 2;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe('true\ntrue')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return output 1', () => {
            Tes.reset()
            const tokens = new Lexer(`
               var x = false or 3 and "hello";
               print x;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe('hello')
        })
    })
})

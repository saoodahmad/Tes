import Tes from '../../src/Tes'
import Lexer from '../../src/lexer/Lexer'
import Parser from '../../src/parser/Parser'
import Interpreter from '../../src/interpreter/Interpreter'

describe('Loop tests', () => {
    describe('Given: Correct program', () => {
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
               
                for (var x = 0; x <10; x = x + 1) {
                    if(x == 1) continue;

                    if(x > 5) {
                        break;
                    }
                    print x;
                    print " ";
                }
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe(`0 2 3 4 5`)
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
               
                var x = 0;
                for (;;) {
                    if(x == 1) { x = x + 1; continue;}

                    if(x > 5) {
                        break;
                    }
                    print x;
                    print " ";
                    x = x + 1;
                }
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe(`0 2 3 4 5`)
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                var x = 0;
                while (x <10) {
                    if(x == 1) { x = x + 1; continue; }

                    if(x > 5) {
                        break;
                    }
                    print x;
                    print " ";
                    x = x + 1;
                }
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe(`0 2 3 4 5`)
        })
    })
})

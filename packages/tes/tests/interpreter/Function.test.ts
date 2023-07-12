import Tes from '../../src/Tes'
import Lexer from '../../src/lexer/Lexer'
import Parser from '../../src/parser/Parser'
import Interpreter from '../../src/interpreter/Interpreter'

describe('Given: Function declaration and call', () => {
    describe('Given: Incorrect program', () => {
        it('Return interpreter error', () => {
            Tes.reset()
            const tokens = new Lexer(`
                    fun min(x, y) {
                        return x + y;
                    }
                `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(true)

            expect(Tes.error.trimEnd()).toBe(
                '[Line 2] Interpreter Error : min is an inbuilt function.'
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return interpreter error', () => {
            Tes.reset()
            const tokens = new Lexer(`
                    add(3, 2);
                `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(true)

            expect(Tes.error.trimEnd()).toBe(
                "[Line 2] Interpreter Error : Undefined identifier 'add'."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return interpreter error', () => {
            Tes.reset()
            const tokens = new Lexer(`
                    var x = 2;
                    x(3, 2);
                `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(true)

            expect(Tes.error.trimEnd()).toBe(
                '[Line 3] Interpreter Error : Can only call functions.'
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return interpreter error', () => {
            Tes.reset()
            const tokens = new Lexer(`
                    fun add(x, y) {
                        return x + y;
                    }
                    add(3, 2, 4);
                `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(true)

            expect(Tes.error.trimEnd()).toBe(
                '[Line 5] Interpreter Error : Expected 2 arguments but got 3.'
            )
            expect(Tes.output).toBe('')
        })
    })

    describe('Given: Correct program', () => {
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                fun add(x, y) {
                    return x + y;
                }
                
                print add(1,2);
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output).toBe('3')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                fun add(x, y) {
                    print x + y; 
                    return ;
                }
                add(2,3);
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output).toBe('5')
        })
    })
})

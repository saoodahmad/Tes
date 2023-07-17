import Tes from '../../src/Tes'
import Lexer from '../../src/lexer/Lexer'
import Parser from '../../src/parser/Parser'
import Interpreter from '../../src/interpreter/Interpreter'

describe('Given: Variable declaration, assignment and variable expression', () => {
    describe('Given: Incorrect program', () => {
        it('Return interpreter error', () => {
            Tes.reset()
            const tokens = new Lexer(`
                x = 12;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(true)

            expect(Tes.error.trimEnd()).toBe(
                "[Line 2] Interpreter Error at 'x': Undefined identifier 'x'."
            )

            expect(Tes.output).toBe(``)
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return interpreter error', () => {
            Tes.reset()
            const tokens = new Lexer(`
                print x +1;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(true)

            expect(Tes.error.trimEnd()).toBe(
                "[Line 2] Interpreter Error at 'x': Undefined identifier 'x'."
            )

            expect(Tes.output).toBe(``)
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return interpreter error', () => {
            Tes.reset()
            const tokens = new Lexer(`
                var x= 2; 
                print 1 + " ";
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(true)

            expect(Tes.error.trimEnd()).toBe(
                "[Line 3] Interpreter Error at '+': Operands must be two numbers or two strings."
            )

            expect(Tes.output).toBe(``)
        })
    })

    describe('Given: Correct program', () => {
        it('Return output', () => {
            Tes.reset()
            const tokens = new Lexer(`
                var x = 12;
    
                println x;
    
                x = 11;
    
                println x;
    
                println x + 2;
            `).lex()

            expect(Tes.hasLexerError).toBe(false)

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(Tes.hasParserError).toBe(false)

            const interpreter = new Interpreter(program)

            interpreter.interpret()

            expect(Tes.hasInterpreterError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output.trimEnd()).toBe(`12\n11\n13`)
        })
    })
})

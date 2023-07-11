import Tes from '../../../src/Tes'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: PrintLine statement', () => {
    describe('Given: Incorrect syntax', () => {
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`println`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                '[Line 1] Parser Error at end: Expected expression.'
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`println for `).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at 'for': Expected expression."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`println 1`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ';' after expression."
            )
            expect(Tes.output).toBe('')
        })
    })
    describe('Given: Correct syntax', () => {
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`println 2 + 4 and 3;`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            expression: expect.objectContaining({
                                left: expect.objectContaining({
                                    left: expect.objectContaining({
                                        value: 2,
                                    }),
                                    operator: expect.objectContaining({
                                        lexeme: '+',
                                        line: 1,
                                        literal: null,
                                        type: 'PLUS',
                                    }),
                                    right: expect.objectContaining({
                                        value: 4,
                                    }),
                                }),
                                operator: expect.objectContaining({
                                    lexeme: 'and',
                                    line: 1,
                                    literal: null,
                                    type: 'AND',
                                }),
                                right: expect.objectContaining({
                                    value: 3,
                                }),
                            }),
                        }),
                    ]),
                })
            )

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output).toBe('')
        })
    })
})

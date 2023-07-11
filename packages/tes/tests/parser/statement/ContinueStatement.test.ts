import Tes from '../../../src/Tes'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: Continue statement', () => {
    describe('Given: Incorrect syntax', () => {
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`continue`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ';' after 'continue'."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`continue ;`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at 'continue': Unexpected use of 'continue'."
            )
            expect(Tes.output).toBe('')
        })
    })

    describe('Given: Correct syntax', () => {
        it('Return program 1', () => {
            Tes.reset()
            const tokens = new Lexer(`for ( ; ; )  continue ;`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                keyword: expect.objectContaining({
                                    type: 'CONTINUE',
                                    lexeme: 'continue',
                                    literal: null,
                                    line: 1,
                                }),
                            }),
                            condition: expect.objectContaining({
                                value: true,
                            }),
                            increment: null,
                            initializer: null,
                        }),
                    ]),
                })
            )

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`for ( ; ; ) { continue ;}`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                declarations: expect.arrayContaining([
                                    expect.objectContaining({
                                        keyword: expect.objectContaining({
                                            type: 'CONTINUE',
                                            lexeme: 'continue',
                                            literal: null,
                                            line: 1,
                                        }),
                                    }),
                                ]),
                            }),
                            condition: expect.objectContaining({
                                value: true,
                            }),
                            increment: null,
                            initializer: null,
                        }),
                    ]),
                })
            )

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`while ( true )  continue ;`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                keyword: expect.objectContaining({
                                    type: 'CONTINUE',
                                    lexeme: 'continue',
                                    literal: null,
                                    line: 1,
                                }),
                            }),
                            condition: expect.objectContaining({
                                value: true,
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

        // eslint-disable-next-line jest/no-identical-title
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`while ( true ) { continue ;}`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                declarations: expect.arrayContaining([
                                    expect.objectContaining({
                                        keyword: expect.objectContaining({
                                            type: 'CONTINUE',
                                            lexeme: 'continue',
                                            literal: null,
                                            line: 1,
                                        }),
                                    }),
                                ]),
                            }),
                            condition: expect.objectContaining({
                                value: true,
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

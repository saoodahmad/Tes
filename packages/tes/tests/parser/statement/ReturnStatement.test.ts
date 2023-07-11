import Tes from '../../../src/Tes'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: Return statement', () => {
    describe('Given: Incorrect syntax', () => {
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`return`).lex()

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
            const tokens = new Lexer(`return nil`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ';' at end of return."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`return ;`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at 'return': Unexpected use of 'return'."
            )
            expect(Tes.output).toBe('')
        })
    })

    describe('Given: Correct syntax', () => {
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`fun hello (  ) {  return ; } `).lex()

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
                                            type: 'RETURN',
                                            lexeme: 'return',
                                            literal: null,
                                            line: 1,
                                        }),
                                        value: null,
                                    }),
                                ]),
                            }),
                            name: expect.objectContaining({
                                type: 'IDENTIFIER',
                                lexeme: 'hello',
                                literal: null,
                                line: 1,
                            }),
                            formalArguments: [],
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
        it('Return program 1', () => {
            Tes.reset()
            const tokens = new Lexer(`fun hello (  ) {  return nil ; } `).lex()

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
                                            type: 'RETURN',
                                            lexeme: 'return',
                                            literal: null,
                                            line: 1,
                                        }),
                                        value: expect.objectContaining({
                                            value: null,
                                        }),
                                    }),
                                ]),
                            }),
                            name: expect.objectContaining({
                                type: 'IDENTIFIER',
                                lexeme: 'hello',
                                literal: null,
                                line: 1,
                            }),
                            formalArguments: [],
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

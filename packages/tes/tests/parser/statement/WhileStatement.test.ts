import Tes from '../../../src/Tes'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: While statement', () => {
    describe('Given: Incorrect syntax', () => {
        // block body will be validated in block statement

        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`while`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected '(' after 'while'."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`while( `).lex()

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
            const tokens = new Lexer(`while ( x >  0 `).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ')' after expression (condition)."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`while ( x >  0 )`).lex()
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
    })

    describe('Given: Correct syntax', () => {
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`while ( x >  0 ) x = x + 1;`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                expression: expect.objectContaining({
                                    name: expect.objectContaining({
                                        lexeme: 'x',
                                        line: 1,
                                        literal: null,
                                        type: 'IDENTIFIER',
                                    }),
                                    value: expect.objectContaining({
                                        left: expect.objectContaining({
                                            name: expect.objectContaining({
                                                lexeme: 'x',
                                                line: 1,
                                                literal: null,
                                                type: 'IDENTIFIER',
                                            }),
                                        }),
                                        operator: expect.objectContaining({
                                            lexeme: '+',
                                            line: 1,
                                            literal: null,
                                            type: 'PLUS',
                                        }),
                                        right: expect.objectContaining({
                                            value: 1,
                                        }),
                                    }),
                                }),
                            }),
                            condition: expect.objectContaining({
                                left: expect.objectContaining({
                                    name: expect.objectContaining({
                                        lexeme: 'x',
                                        line: 1,
                                        literal: null,
                                        type: 'IDENTIFIER',
                                    }),
                                }),
                                operator: expect.objectContaining({
                                    lexeme: '>',
                                    line: 1,
                                    literal: null,
                                    type: 'GREATER',
                                }),
                                right: expect.objectContaining({
                                    value: 0,
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

        // eslint-disable-next-line jest/no-identical-title
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`while ( x >  0 ) {x = x + 1;}`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                declarations: expect.arrayContaining([
                                    expect.objectContaining({
                                        expression: expect.objectContaining({
                                            name: expect.objectContaining({
                                                lexeme: 'x',
                                                line: 1,
                                                literal: null,
                                                type: 'IDENTIFIER',
                                            }),
                                            value: expect.objectContaining({
                                                left: expect.objectContaining({
                                                    name: expect.objectContaining(
                                                        {
                                                            lexeme: 'x',
                                                            line: 1,
                                                            literal: null,
                                                            type: 'IDENTIFIER',
                                                        }
                                                    ),
                                                }),
                                                operator:
                                                    expect.objectContaining({
                                                        lexeme: '+',
                                                        line: 1,
                                                        literal: null,
                                                        type: 'PLUS',
                                                    }),
                                                right: expect.objectContaining({
                                                    value: 1,
                                                }),
                                            }),
                                        }),
                                    }),
                                ]),
                            }),
                            condition: expect.objectContaining({
                                left: expect.objectContaining({
                                    name: expect.objectContaining({
                                        lexeme: 'x',
                                        line: 1,
                                        literal: null,
                                        type: 'IDENTIFIER',
                                    }),
                                }),
                                operator: expect.objectContaining({
                                    lexeme: '>',
                                    line: 1,
                                    literal: null,
                                    type: 'GREATER',
                                }),
                                right: expect.objectContaining({
                                    value: 0,
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

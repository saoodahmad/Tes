import Tes from '../../../src/Tes'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: If statement', () => {
    describe('Given: Incorrect syntax', () => {
        // block body will be validated in block statement

        it('Return parser error', () => {
            Tes.reset()

            const tokens = new Lexer(`if`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected '(' after 'if'."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()

            const tokens = new Lexer(`if ( `).lex()

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

            const tokens = new Lexer(`if ( x > 10 `).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ')' after if condition."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()

            const tokens = new Lexer(`if ( x > 10 )`).lex()

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

            const tokens = new Lexer(`if ( x > 10 ) { `).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected '}' at the end of body or block statement."
            )
            expect(Tes.output).toBe('')
        })
    })

    describe('Given: Correct syntax', () => {
        it('Return program', () => {
            Tes.reset()

            const tokens = new Lexer(`if ( x > 10 ) { } else  { }`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            condition: expect.objectContaining({
                                left: expect.objectContaining({
                                    name: {
                                        lexeme: 'x',
                                        line: 1,
                                        literal: null,
                                        type: 'IDENTIFIER',
                                    },
                                }),
                                operator: expect.objectContaining({
                                    lexeme: '>',
                                    line: 1,
                                    literal: null,
                                    type: 'GREATER',
                                }),
                                right: expect.objectContaining({
                                    value: 10,
                                }),
                            }),
                            thenBranch: expect.objectContaining({
                                declarations: [],
                            }),
                            elseBranch: expect.objectContaining({
                                declarations: [],
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

            const tokens = new Lexer(
                `if ( x > 10 ) if( x < 12) { } else  { }`
            ).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            condition: expect.objectContaining({
                                left: expect.objectContaining({
                                    name: {
                                        lexeme: 'x',
                                        line: 1,
                                        literal: null,
                                        type: 'IDENTIFIER',
                                    },
                                }),
                                operator: expect.objectContaining({
                                    lexeme: '>',
                                    line: 1,
                                    literal: null,
                                    type: 'GREATER',
                                }),
                                right: expect.objectContaining({
                                    value: 10,
                                }),
                            }),
                            thenBranch: expect.objectContaining({
                                condition: expect.objectContaining({
                                    left: expect.objectContaining({
                                        name: {
                                            lexeme: 'x',
                                            line: 1,
                                            literal: null,
                                            type: 'IDENTIFIER',
                                        },
                                    }),
                                    operator: expect.objectContaining({
                                        lexeme: '<',
                                        line: 1,
                                        literal: null,
                                        type: 'LESS',
                                    }),
                                    right: expect.objectContaining({
                                        value: 12,
                                    }),
                                }),
                                thenBranch: expect.objectContaining({
                                    declarations: [],
                                }),
                                elseBranch: expect.objectContaining({
                                    declarations: [],
                                }),
                            }),
                            elseBranch: null,
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

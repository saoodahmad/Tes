import Tes from '../../../src/Tes'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: For statement', () => {
    describe('Given: Incorrect syntax', () => {
        // block body will be validated in block statement

        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`for`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected '(' after 'for'."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`for( `).lex()

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
            const tokens = new Lexer(`for( var x = 0`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ';' after variable declaration."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`for( x = 0`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ';' at end of  expression."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`for( var x = 0; x > 10`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected ';' after loop condition."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error ', () => {
            Tes.reset()
            const tokens = new Lexer(`for( var x = 0; x > 10; `).lex()

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
            const tokens = new Lexer(`for( var x = 0; x > 10; ) `).lex()

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
            const tokens = new Lexer(`for( var x = 0; x > 10; ) { `).lex()

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
            const tokens = new Lexer(
                `for( var x = 0; x > 10;  x = x + 1) { }`
            ).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                declarations: [],
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
                                    value: 10,
                                }),
                            }),
                            increment: expect.objectContaining({
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
                            initializer: expect.objectContaining({
                                name: expect.objectContaining({
                                    lexeme: 'x',
                                    line: 1,
                                    literal: null,
                                    type: 'IDENTIFIER',
                                }),
                                initializer: expect.objectContaining({
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
            const tokens = new Lexer(
                `for( var x = 0; x > 10;  x = x + 1) print 2;`
            ).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            body: expect.objectContaining({
                                expression: expect.objectContaining({
                                    value: 2,
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
                                    value: 10,
                                }),
                            }),
                            increment: expect.objectContaining({
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
                            initializer: expect.objectContaining({
                                name: expect.objectContaining({
                                    lexeme: 'x',
                                    line: 1,
                                    literal: null,
                                    type: 'IDENTIFIER',
                                }),
                                initializer: expect.objectContaining({
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

import Tes from '../../../src/Tes'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: Expression statement', () => {
    describe('Given: Incorrect syntax', () => {
        it('Return parser error', () => {
            Tes.reset()
            const tokens = new Lexer(`x + 1  `).lex()

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
    })

    describe('Given: Correct syntax', () => {
        it('Return program', () => {
            Tes.reset()
            const tokens = new Lexer(`x + 1 ;`).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            expression: expect.objectContaining({
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
                `hello(1,x, "hello", true, false, nil);`
            ).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            expression: expect.objectContaining({
                                callee: expect.objectContaining({
                                    name: expect.objectContaining({
                                        lexeme: 'hello',
                                        line: 1,
                                        literal: null,
                                        type: 'IDENTIFIER',
                                    }),
                                }),
                                parenthesis: expect.objectContaining({
                                    lexeme: ')',
                                    line: 1,
                                    literal: null,
                                    type: 'RIGHT_PAREN',
                                }),
                                callArguments: expect.arrayContaining([
                                    expect.objectContaining({
                                        value: 1,
                                    }),
                                    expect.objectContaining({
                                        name: expect.objectContaining({
                                            lexeme: 'x',
                                            line: 1,
                                            literal: null,
                                            type: 'IDENTIFIER',
                                        }),
                                    }),
                                    expect.objectContaining({
                                        value: 'hello',
                                    }),
                                    expect.objectContaining({
                                        value: true,
                                    }),
                                    expect.objectContaining({
                                        value: false,
                                    }),
                                    expect.objectContaining({
                                        value: null,
                                    }),
                                ]),
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
                `x = 2 != 1 == 3 >=2 >2 <=2 <2 or 1 - 2 + 3 % (5 * 2)/4 and true != !true;`
            ).lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
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
                                        left: expect.objectContaining({
                                            left: expect.objectContaining({
                                                value: 2,
                                            }),
                                            operator: expect.objectContaining({
                                                lexeme: '!=',
                                                line: 1,
                                                literal: null,
                                                type: 'BANG_EQUAL',
                                            }),
                                            right: expect.objectContaining({
                                                value: 1,
                                            }),
                                        }),
                                        operator: expect.objectContaining({
                                            lexeme: '==',
                                            line: 1,
                                            literal: null,
                                            type: 'EQUAL_EQUAL',
                                        }),
                                        right: expect.objectContaining({
                                            left: expect.objectContaining({
                                                left: expect.objectContaining({
                                                    left: expect.objectContaining(
                                                        {
                                                            left: expect.objectContaining(
                                                                {
                                                                    value: 3,
                                                                }
                                                            ),
                                                            operator:
                                                                expect.objectContaining(
                                                                    {
                                                                        lexeme: '>=',
                                                                        line: 1,
                                                                        literal:
                                                                            null,
                                                                        type: 'GREATER_EQUAL',
                                                                    }
                                                                ),
                                                            right: expect.objectContaining(
                                                                { value: 2 }
                                                            ),
                                                        }
                                                    ),
                                                    operator:
                                                        expect.objectContaining(
                                                            {
                                                                lexeme: '>',
                                                                line: 1,
                                                                literal: null,
                                                                type: 'GREATER',
                                                            }
                                                        ),
                                                    right: expect.objectContaining(
                                                        {
                                                            value: 2,
                                                        }
                                                    ),
                                                }),
                                            }),
                                            operator: expect.objectContaining({
                                                lexeme: '<',
                                                line: 1,
                                                literal: null,
                                                type: 'LESS',
                                            }),
                                            right: expect.objectContaining({
                                                value: 2,
                                            }),
                                        }),
                                    }),
                                    operator: expect.objectContaining({
                                        lexeme: 'or',
                                        line: 1,
                                        literal: null,
                                        type: 'OR',
                                    }),
                                    right: expect.objectContaining({
                                        left: expect.objectContaining({
                                            left: expect.objectContaining({
                                                left: expect.objectContaining({
                                                    value: 1,
                                                }),
                                                operator:
                                                    expect.objectContaining({
                                                        lexeme: '-',
                                                        line: 1,
                                                        literal: null,
                                                        type: 'MINUS',
                                                    }),
                                                right: expect.objectContaining({
                                                    value: 2,
                                                }),
                                            }),
                                            operator: expect.objectContaining({
                                                lexeme: '+',
                                                line: 1,
                                                literal: null,
                                                type: 'PLUS',
                                            }),
                                            right: expect.objectContaining({
                                                left: expect.objectContaining({
                                                    left: expect.objectContaining(
                                                        { value: 3 }
                                                    ),
                                                    operator:
                                                        expect.objectContaining(
                                                            {
                                                                lexeme: '%',
                                                                line: 1,
                                                                literal: null,
                                                                type: 'MODULO',
                                                            }
                                                        ),
                                                    right: expect.objectContaining(
                                                        {
                                                            expression:
                                                                expect.objectContaining(
                                                                    {
                                                                        left: expect.objectContaining(
                                                                            {
                                                                                value: 5,
                                                                            }
                                                                        ),
                                                                        operator:
                                                                            expect.objectContaining(
                                                                                {
                                                                                    lexeme: '*',
                                                                                    line: 1,
                                                                                    literal:
                                                                                        null,
                                                                                    type: 'STAR',
                                                                                }
                                                                            ),
                                                                        right: expect.objectContaining(
                                                                            {
                                                                                value: 2,
                                                                            }
                                                                        ),
                                                                    }
                                                                ),
                                                        }
                                                    ),
                                                }),
                                                operator:
                                                    expect.objectContaining({
                                                        lexeme: '/',
                                                        line: 1,
                                                        literal: null,
                                                        type: 'SLASH',
                                                    }),
                                                right: expect.objectContaining({
                                                    value: 4,
                                                }),
                                            }),
                                        }),
                                        operator: expect.objectContaining({
                                            lexeme: 'and',
                                            line: 1,
                                            literal: null,
                                            type: 'AND',
                                        }),
                                        right: expect.objectContaining({
                                            left: expect.objectContaining({
                                                value: true,
                                            }),
                                            operator: expect.objectContaining({
                                                lexeme: '!=',
                                                line: 1,
                                                literal: null,
                                                type: 'BANG_EQUAL',
                                            }),
                                            right: expect.objectContaining({
                                                operator:
                                                    expect.objectContaining({
                                                        lexeme: '!',
                                                        line: 1,
                                                        literal: null,
                                                        type: 'BANG',
                                                    }),
                                                right: expect.objectContaining({
                                                    value: true,
                                                }),
                                            }),
                                        }),
                                    }),
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

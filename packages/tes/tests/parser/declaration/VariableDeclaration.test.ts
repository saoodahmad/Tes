import Tes from '../../../src/Tes'
import Token from '../../../src/grammar/lexer_grammar/Token'
import Lexer from '../../../src/lexer/Lexer'
import Parser from '../../../src/parser/Parser'

describe('Given: Variable Declaration', () => {
    describe('Given: Incorrect syntax', () => {
        it('Return parser error', () => {
            Tes.reset()

            const tokens: Token[] = new Lexer('var ').lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at end: Expected identifier (variable name) after 'var'."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()

            const tokens: Token[] = new Lexer('var or').lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toBe(null)

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.hasParserError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                "[Line 1] Parser Error at 'or': Expected identifier (variable name) after 'var'."
            )
            expect(Tes.output).toBe('')
        })

        // eslint-disable-next-line jest/no-identical-title
        it('Return parser error', () => {
            Tes.reset()

            const tokens: Token[] = new Lexer('var x = ').lex()

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

            const tokens: Token[] = new Lexer('var x = 2').lex()

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
    })

    describe('Given: Correct syntax', () => {
        it('Return program', () => {
            Tes.reset()

            const tokens: Token[] = new Lexer('var x;').lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            initializer: null,
                            name: expect.objectContaining({
                                lexeme: 'x',
                                line: 1,
                                literal: null,
                                type: 'IDENTIFIER',
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

            const tokens: Token[] = new Lexer('var x = 2;').lex()

            const parser = new Parser(tokens)

            const program = parser.parse()

            expect(program).toEqual(
                expect.objectContaining({
                    declarations: expect.arrayContaining([
                        expect.objectContaining({
                            initializer: expect.objectContaining({
                                value: 2,
                            }),
                            name: expect.objectContaining({
                                lexeme: 'x',
                                line: 1,
                                literal: null,
                                type: 'IDENTIFIER',
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

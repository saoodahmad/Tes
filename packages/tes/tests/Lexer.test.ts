import Tes from '../src/Tes'
import Lexer from '../src/lexer/Lexer'

describe('Lexer Tests', () => {
    describe('Given: Source code has unterminated block comment', () => {
        it('Return lexer error', () => {
            Tes.reset()

            const src = `
            /* unterminated block comment
            `.trimEnd()

            const lexer = new Lexer(src)

            lexer.lex()

            expect(Tes.hasLexerError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                '[Line 2] Lexer Error : Unterminated comment'
            )
            expect(Tes.output).toBe('')
        })
    })

    describe('Given: Source code has unterminated string', () => {
        it('Return lexer error', () => {
            Tes.reset()

            const src = `
            var x = "hhhhhh;
            `.trimEnd()

            const lexer = new Lexer(src)

            lexer.lex()

            expect(Tes.hasLexerError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                '[Line 2] Lexer Error : Unterminated string'
            )
            expect(Tes.output).toBe('')
        })
    })

    describe('Given: Source code has unexpected character', () => {
        it('Return lexer error', () => {
            Tes.reset()

            // @, #, $  is used as an sample unexpected character

            const src = `
                @
                var # = 12;
                var x = $; // this line will not result in lexer error
            `.trimEnd()

            const lexer = new Lexer(src)

            lexer.lex()

            expect(Tes.hasLexerError).toBe(true)
            expect(Tes.error.trimEnd()).toBe(
                `[Line 2] Lexer Error : Unexpected character '@'\n[Line 3] Lexer Error : Unexpected character '#'\n[Line 4] Lexer Error : Unexpected character '$'`
            )
            expect(Tes.output).toBe('')
        })
    })

    describe('Given: Source code is valid', () => {
        it('Generates tokens for parser', () => {
            Tes.reset()

            const src = `
                // line comment
                /*
                    block comment
                */
                \t
                \r
                \n
                12
                12.3
                "some string"
                +
                -
                *
                /
                %
                =
                ==
                !
                !=
                <
                <=
                >
                >=
                and
                or
                {
                }
                (
                )
                ,
                ;
                true
                false
                nil
                x
                var
                fun
                for
                while
                if
                else
                continue
                break
                return
                print
                println
            `.trimEnd()

            const lexer = new Lexer(src)

            const tokens = lexer.lex()

            expect(Tes.hasLexerError).toBe(false)
            expect(Tes.error).toBe('')
            expect(Tes.output).toBe('')
            expect(tokens).toHaveLength(40)

            expect(tokens).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'NUMBER',
                        lexeme: '12',
                        literal: 12,
                        line: 10,
                    }),
                    expect.objectContaining({
                        type: 'NUMBER',
                        lexeme: '12.3',
                        literal: 12.3,
                        line: 11,
                    }),
                    expect.objectContaining({
                        type: 'STRING',
                        lexeme: '"some string"',
                        literal: 'some string',
                        line: 12,
                    }),
                    expect.objectContaining({
                        type: 'PLUS',
                        lexeme: '+',
                        literal: null,
                        line: 13,
                    }),
                    expect.objectContaining({
                        type: 'MINUS',
                        lexeme: '-',
                        literal: null,
                        line: 14,
                    }),
                    expect.objectContaining({
                        type: 'STAR',
                        lexeme: '*',
                        literal: null,
                        line: 15,
                    }),
                    expect.objectContaining({
                        type: 'SLASH',
                        lexeme: '/',
                        literal: null,
                        line: 16,
                    }),
                    expect.objectContaining({
                        type: 'MODULO',
                        lexeme: '%',
                        literal: null,
                        line: 17,
                    }),
                    expect.objectContaining({
                        type: 'EQUAL',
                        lexeme: '=',
                        literal: null,
                        line: 18,
                    }),
                    expect.objectContaining({
                        type: 'EQUAL_EQUAL',
                        lexeme: '==',
                        literal: null,
                        line: 19,
                    }),
                    expect.objectContaining({
                        type: 'BANG',
                        lexeme: '!',
                        literal: null,
                        line: 20,
                    }),
                    expect.objectContaining({
                        type: 'BANG_EQUAL',
                        lexeme: '!=',
                        literal: null,
                        line: 21,
                    }),
                    expect.objectContaining({
                        type: 'LESS',
                        lexeme: '<',
                        literal: null,
                        line: 22,
                    }),
                    expect.objectContaining({
                        type: 'LESS_EQUAL',
                        lexeme: '<=',
                        literal: null,
                        line: 23,
                    }),
                    expect.objectContaining({
                        type: 'GREATER',
                        lexeme: '>',
                        literal: null,
                        line: 24,
                    }),
                    expect.objectContaining({
                        type: 'GREATER_EQUAL',
                        lexeme: '>=',
                        literal: null,
                        line: 25,
                    }),
                    expect.objectContaining({
                        type: 'AND',
                        lexeme: 'and',
                        literal: null,
                        line: 26,
                    }),
                    expect.objectContaining({
                        type: 'OR',
                        lexeme: 'or',
                        literal: null,
                        line: 27,
                    }),
                    expect.objectContaining({
                        type: 'LEFT_BRACE',
                        lexeme: '{',
                        literal: null,
                        line: 28,
                    }),
                    expect.objectContaining({
                        type: 'RIGHT_BRACE',
                        lexeme: '}',
                        literal: null,
                        line: 29,
                    }),
                    expect.objectContaining({
                        type: 'LEFT_PAREN',
                        lexeme: '(',
                        literal: null,
                        line: 30,
                    }),
                    expect.objectContaining({
                        type: 'RIGHT_PAREN',
                        lexeme: ')',
                        literal: null,
                        line: 31,
                    }),
                    expect.objectContaining({
                        type: 'COMMA',
                        lexeme: ',',
                        literal: null,
                        line: 32,
                    }),
                    expect.objectContaining({
                        type: 'SEMICOLON',
                        lexeme: ';',
                        literal: null,
                        line: 33,
                    }),
                    expect.objectContaining({
                        type: 'TRUE',
                        lexeme: 'true',
                        literal: null,
                        line: 34,
                    }),
                    expect.objectContaining({
                        type: 'FALSE',
                        lexeme: 'false',
                        literal: null,
                        line: 35,
                    }),
                    expect.objectContaining({
                        type: 'NIL',
                        lexeme: 'nil',
                        literal: null,
                        line: 36,
                    }),
                    expect.objectContaining({
                        type: 'IDENTIFIER',
                        lexeme: 'x',
                        literal: null,
                        line: 37,
                    }),
                    expect.objectContaining({
                        type: 'VAR',
                        lexeme: 'var',
                        literal: null,
                        line: 38,
                    }),
                    expect.objectContaining({
                        type: 'FUN',
                        lexeme: 'fun',
                        literal: null,
                        line: 39,
                    }),
                    expect.objectContaining({
                        type: 'FOR',
                        lexeme: 'for',
                        literal: null,
                        line: 40,
                    }),
                    expect.objectContaining({
                        type: 'WHILE',
                        lexeme: 'while',
                        literal: null,
                        line: 41,
                    }),
                    expect.objectContaining({
                        type: 'IF',
                        lexeme: 'if',
                        literal: null,
                        line: 42,
                    }),
                    expect.objectContaining({
                        type: 'ELSE',
                        lexeme: 'else',
                        literal: null,
                        line: 43,
                    }),
                    expect.objectContaining({
                        type: 'CONTINUE',
                        lexeme: 'continue',
                        literal: null,
                        line: 44,
                    }),
                    expect.objectContaining({
                        type: 'BREAK',
                        lexeme: 'break',
                        literal: null,
                        line: 45,
                    }),
                    expect.objectContaining({
                        type: 'RETURN',
                        lexeme: 'return',
                        literal: null,
                        line: 46,
                    }),
                    expect.objectContaining({
                        type: 'PRINT',
                        lexeme: 'print',
                        literal: null,
                        line: 47,
                    }),
                    expect.objectContaining({
                        type: 'PRINTLN',
                        lexeme: 'println',
                        literal: null,
                        line: 48,
                    }),
                    expect.objectContaining({
                        type: 'EOF',
                        lexeme: '',
                        literal: null,
                        line: 48,
                    }),
                ])
            )
        })
    })
})

import TokenKind from './TokenType'

const keywords = new Map<string, TokenKind>()

keywords.set('and', TokenKind.AND)
keywords.set('or', TokenKind.OR)

keywords.set('true', TokenKind.TRUE)
keywords.set('false', TokenKind.FALSE)
keywords.set('nil', TokenKind.NIL)

keywords.set('if', TokenKind.IF)
keywords.set('else', TokenKind.ELSE)
keywords.set('continue', TokenKind.CONTINUE)
keywords.set('break', TokenKind.BREAK)
keywords.set('return', TokenKind.RETURN)

keywords.set('for', TokenKind.FOR)
keywords.set('while', TokenKind.WHILE)

keywords.set('var', TokenKind.VAR)
keywords.set('fun', TokenKind.FUN)
keywords.set('print', TokenKind.PRINT)
keywords.set('println', TokenKind.PRINTLN)

export default keywords

import Token from '../../lexer_grammar/Token'
import Visitor from '../declaration/Visitor'
import Statement from './Statement'

export default class ContinueStatement extends Statement {
    keyword: Token

    constructor(keyword: Token) {
        super()
        this.keyword = keyword
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitContinueStatement(this)
    }
}

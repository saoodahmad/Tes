import Token from '../../lexer_grammar/Token'
import Expression from './Expression'
import Visitor from '../declaration/Visitor'

export default class BinaryExpression extends Expression {
    left: Expression

    right: Expression

    operator: Token

    constructor(left: Expression, operator: Token, right: Expression) {
        super()
        this.left = left
        this.operator = operator
        this.right = right
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitBinaryExpression(this)
    }
}

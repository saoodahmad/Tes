import Expression from './Expression'
import Visitor from '../declaration/Visitor'

export default class LiteralExpression extends Expression {
    value: unknown

    constructor(value: unknown) {
        super()
        this.value = value
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitLiteralExpression(this)
    }
}

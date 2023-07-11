import Visitor from '../declaration/Visitor'
import Expression from '../expression/Expression'

import Statement from './Statement'

export default class ForStatment extends Statement {
    initializer: Statement

    condition: Expression

    increment: Expression

    body: Statement

    constructor(
        initializer: Statement,
        condition: Expression,
        increment: Expression,
        body: Statement
    ) {
        super()
        this.initializer = initializer
        this.condition = condition
        this.increment = increment
        this.body = body
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitForStatement(this)
    }
}

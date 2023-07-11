import FunctionDeclaration from './FunctionDeclaration'
import VariableDeclaration from './VariableDeclaration'

import BlockStatement from '../statement/BlockStatement'
import BreakStatement from '../statement/BreakStatement'
import ExpressionStatement from '../statement/ExpressionStatement'
import IfStatement from '../statement/IfStatement'
import PrintStatement from '../statement/PrintStatement'
import WhileStatment from '../statement/WhileStatement'
import ForStatment from '../statement/ForStatement'
import ContinueStatement from '../statement/ContinueStatement'
import ReturnStatement from '../statement/ReturnStatement'

import AssignExpression from '../expression/AssignExpression'
import BinaryExpression from '../expression/BinaryExpression'
import GroupingExpression from '../expression/GroupingExpression'
import LiteralExpression from '../expression/LiteralExpression'
import LogicalExpression from '../expression/LogicalExpression'
import UnaryExpression from '../expression/UnaryExpression'
import VariableExpression from '../expression/VariableExpression'
import CallExpression from '../expression/CallExpression'
import PrintLineStatement from '../statement/PrintLineStatement'

export default interface Visitor<T> {
    visitFunctionDeclaration(declaration: FunctionDeclaration): T
    visitVariableDeclaration(declaration: VariableDeclaration): T

    visitExpressionStatment(statement: ExpressionStatement): T
    visitForStatement(statement: ForStatment): T
    visitIfStatement(statement: IfStatement): T
    visitPrintStatement(statement: PrintStatement): T
    visitPrintLineStatement(statement: PrintLineStatement): T
    visitBreakStatement(statement: BreakStatement): T
    visitContinueStatement(statement: ContinueStatement): T
    visitReturnStatement(statement: ReturnStatement): T
    visitWhileStatement(statement: WhileStatment): T
    visitBlockStatement(statement: BlockStatement): T

    visitBinaryExpression(expression: BinaryExpression): T
    visitUnaryExpression(expression: UnaryExpression): T
    visitLiteralExpression(expression: LiteralExpression): T
    visitGroupingExpression(expression: GroupingExpression): T
    visitVariableExpression(expression: VariableExpression): T
    visitAssignExpression(expression: AssignExpression): T
    visitLogicalExpression(expression: LogicalExpression): T
    visitCallExpression(expression: CallExpression): T
}

import Interpreter from '../../interpreter/Interpreter'

export default interface Callable {
    arity(): number
    call(interpreter: Interpreter, callArguments: unknown[]): unknown
}

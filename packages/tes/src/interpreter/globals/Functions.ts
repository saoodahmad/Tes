// eslint-disable-next-line max-classes-per-file
import Callable from '../../grammar/interpreter_grammar/Callable'
import Interpreter from '../Interpreter'

export class Minimum implements Callable {
    arity(): number {
        return 2
    }

    call(_interpreter: Interpreter, callArguments: unknown[]): unknown {
        return Math.min(Number(callArguments[0]), Number(callArguments[1]))
    }
}

export class Maximum implements Callable {
    arity(): number {
        return 2
    }

    call(_interpreter: Interpreter, callArguments: unknown[]): unknown {
        return Math.max(Number(callArguments[0]), Number(callArguments[1]))
    }
}

export class Absolute implements Callable {
    arity(): number {
        return 2
    }

    call(_interpreter: Interpreter, callArguments: unknown): unknown {
        return Math.abs(Number(callArguments))
    }
}

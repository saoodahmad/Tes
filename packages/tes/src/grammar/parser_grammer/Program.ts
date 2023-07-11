import Declaration from './declaration/Declaration'

export default class Program {
    declarations: Declaration[] = []

    constructor(declarations: Declaration[]) {
        this.declarations = declarations
    }
}

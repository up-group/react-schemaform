export default class ErrorMemory {

    constructor() {
    }

    memory: { [key: string]: boolean } = {}

    errorOn(node: string) {
        this.memory[node] = true;
    }

    cleanErrorOn(node: string) {
        this.memory[node] = false;
    }

    get hasError(): boolean {
        for (var node in this.memory) {
            if (this.memory.hasOwnProperty(node) === false) {
                continue;
            }
            if (this.memory[node] === true) {
                return true;
            }
        }
        return false;
    }

}
export default class ErrorMemory {
    constructor();
    memory: {
        [key: string]: boolean;
    };
    errorOn(node: string, hasError: boolean): void;
    cleanErrorOn(node: string): void;
    readonly hasError: boolean;
}

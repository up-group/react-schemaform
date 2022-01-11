

const GUID_EMPTY =  "00000000-0000-0000-0000-000000000000" ;

export function isEmpty(value: any) : boolean {
    return value === undefined || value === null || value === "" || value === GUID_EMPTY || (Array.isArray(value) && value.length === 0) ;
}

export default class ErrorMemory {
  constructor() {}

  memory: { [key: string]: boolean } = {};

  errorOn(node: string, hasError: boolean) {
    this.memory[node] = hasError;
  }

  cleanErrorOn(node: string) {
    this.memory[node] = false;
  }

  get hasError(): boolean {
    for (var node in this.memory) {
      if (this.memory.hasOwnProperty(node) === false) {
        continue;
      }
      if (!isEmpty(this.memory[node])) {
        return true;
      }
    }
    return false;
  }
}

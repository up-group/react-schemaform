
interface errorControlType<T> {
    hasError: boolean,
    errorMessage?: string
    correctValue?: T
}

interface ErrorControl<T> {
    isValidValue(value: T): errorControlType<T>;
}
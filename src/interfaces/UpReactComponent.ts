export interface ErrorControlType<T> {
  hasError: boolean;
  errorMessage?: string;
  correctValue?: T;
}

export interface ErrorControl<T> {
  isValidValue(value: T): ErrorControlType<T>;
}

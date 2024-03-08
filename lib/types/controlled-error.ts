export interface ControlledError<T> extends Error {
  message: T extends string ? T : 'string';
}

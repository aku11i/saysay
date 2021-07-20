export class CommandNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

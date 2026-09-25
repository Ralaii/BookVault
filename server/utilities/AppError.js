export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statuCode = statusCode
  }
}
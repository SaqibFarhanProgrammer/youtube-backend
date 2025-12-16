class ApiError extends Error {
  constructor(
    message = 'something went wrong',
    statusCode,
    errors = [],
    stotck = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.stotck = stotck;
    this.success = false;
    if (this.stack) {
        this.stack = this.stack;
    }
    else {
        Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };    
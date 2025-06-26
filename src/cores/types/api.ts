export class SuccessResponse<T = any> {
  success: true;
  statusCode: number;
  message: string;
  data: T;

  constructor(message: string, data: T, statusCode = 200) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: {
    code: string;
  };

  constructor(message: string, code: string, statusCode = 500) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.error = { code };
  }
}

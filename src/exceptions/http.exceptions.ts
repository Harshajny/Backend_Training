export default class HttpException extends Error {
    public status: number;
    public errors: string[];
    constructor(status: number, message: string, errors?: string[]) {
      super(message);
      this.status = status;
      if (errors) this.errors = errors;
    }
  }
  
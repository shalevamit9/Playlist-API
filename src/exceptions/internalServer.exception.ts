import { HttpException } from './http.execption.js';

export class InternalServerException extends HttpException {
  constructor(message: string) {
    super(message, 500);
  }
}

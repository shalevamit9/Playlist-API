import { HttpException } from './http.execption.js';

export class ConflictException extends HttpException {
  constructor() {
    super('Conflict', 409);
  }
}

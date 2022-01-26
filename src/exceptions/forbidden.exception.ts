import { HttpException } from './http.execption.js';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', 403);
  }
}

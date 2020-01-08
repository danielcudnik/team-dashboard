import { HttpException } from "./HttpException";

export class WrongCredentialsException extends HttpException {
    constructor() {
        super(409, 'Wrong credetials');
    }
}
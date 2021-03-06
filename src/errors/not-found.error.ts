import { BaseError } from "./base.error";
import { CodeError } from "./code.error";

export class NotFoundError extends BaseError{

    constructor(message: string) {
        super(message, CodeError.NotFound)
    }

}
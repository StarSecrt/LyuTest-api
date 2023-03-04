import { ICommand } from '@nestjs/cqrs';
export declare class LoginCommand implements ICommand {
    readonly email: string;
    readonly password: string;
    constructor(email: string, password: string);
}

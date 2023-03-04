import { ICommand } from '@nestjs/cqrs';
export declare class CreateUserCommand implements ICommand {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    constructor(name: string, email: string, password: string);
}

import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from './cqrs-event';
export declare class UserCreatedEvent extends CqrsEvent implements IEvent {
    readonly email: string;
    readonly signupVerifyToken: string;
    constructor(email: string, signupVerifyToken: string);
}

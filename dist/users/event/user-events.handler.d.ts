import { IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'src/common/email/email.service';
import { TestEvent } from './test.event';
import { UserCreatedEvent } from './user-created.event';
export declare class UserEventsHandler implements IEventHandler<UserCreatedEvent | TestEvent> {
    private emailService;
    constructor(emailService: EmailService);
    handle(event: UserCreatedEvent | TestEvent): Promise<void>;
}

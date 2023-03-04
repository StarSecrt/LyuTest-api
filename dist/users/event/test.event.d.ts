import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from './cqrs-event';
export declare class TestEvent extends CqrsEvent implements IEvent {
    constructor();
}

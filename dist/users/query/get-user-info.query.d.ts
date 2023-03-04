import { IQuery } from '@nestjs/cqrs';
export declare class GetUserInfoQuery implements IQuery {
    readonly userId: string;
    constructor(userId: string);
}

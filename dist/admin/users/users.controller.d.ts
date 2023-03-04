import { LoggerService } from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { UserSingUpDto } from './dto/user-signup.dto';
export declare class UsersController {
    private usersService;
    private readonly Logger;
    constructor(usersService: UsersService, Logger: LoggerService);
    private printLoggerServiceLog;
    createUser(userSingUpDto: UserSingUpDto): Promise<object>;
    getUserInfo(headers: any, userId: string): Promise<UserInfo>;
}

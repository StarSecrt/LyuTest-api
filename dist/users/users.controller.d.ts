import { LoggerService } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { UserInfo } from 'src/admin/users/UserInfo';
import { UsersService } from './users.service';
import { UserSignInDto } from 'src/common/login/dto/user-signin.dto';
import { UserSingUpDto } from 'src/admin/users/dto/user-signup.dto';
export declare class UsersController {
    private usersService;
    private authService;
    private readonly logger;
    constructor(usersService: UsersService, authService: AuthService, logger: LoggerService);
    private printLoggerServiceLog;
    createUser(userSingUpDto: UserSingUpDto): Promise<object>;
    getUserInfo(headers: any, userId: string): Promise<UserInfo>;
    bcryptpassword(userSignInDto: UserSignInDto): Promise<string>;
}

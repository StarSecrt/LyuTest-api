import { LoggerService } from '@nestjs/common';
import { UserInfo } from 'src/admin/users/UserInfo';
import { AuthService } from 'src/common/auth/auth.service';
import { UserSignInDto } from './dto/user-signin.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginService } from './login.service';
export declare class LoginController {
    private loginService;
    private authService;
    private readonly logger;
    constructor(loginService: LoginService, authService: AuthService, logger: LoggerService);
    private printLoggerServiceLog;
    login(userSignInDto: UserSignInDto): Promise<string>;
    getResetToken(headers: any, userId: string): Promise<UserInfo>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<object>;
}

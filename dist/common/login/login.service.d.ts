import { AuthService } from 'src/common/auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { UserSignInDto } from './dto/user-signin.dto';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
export declare class LoginService {
    private emailService;
    private dataSource;
    private authService;
    private T_usersRepository;
    constructor(emailService: EmailService, dataSource: DataSource, authService: AuthService, T_usersRepository: Repository<T_UserEntity>);
    login(userSignInDto: UserSignInDto): Promise<any>;
    dataDecryption(email: string, password: string): Promise<string>;
    resetToken(userId: string): Promise<any>;
    verifyEmail(signupVerifyToken: string): Promise<object>;
}

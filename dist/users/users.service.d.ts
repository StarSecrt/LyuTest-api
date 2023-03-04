import { EmailService } from 'src/common/email/email.service';
import { UserInfo } from 'src/admin/users/UserInfo';
import { DataSource, Repository } from 'typeorm';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import { AuthService } from 'src/common/auth/auth.service';
import { UserSignInDto } from 'src/common/login/dto/user-signin.dto';
export declare class UsersService {
    private emailService;
    private T_usersRepository;
    private dataSource;
    private authService;
    constructor(emailService: EmailService, T_usersRepository: Repository<T_UserEntity>, dataSource: DataSource, authService: AuthService);
    createUser(name: string, email: string, password: string): Promise<object>;
    private checkUserExists;
    private saveUser;
    private saveUserUsingQueryRunner;
    private saveUserUsingTransaction;
    private sendMemberJoinEmail;
    getUserInfo(userId: string): Promise<UserInfo>;
    dataEncryption(EncryptionData: string): Promise<string>;
    bcryptpassword(userSignInDto: UserSignInDto): Promise<string>;
}

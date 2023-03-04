import { EmailService } from 'src/common/email/email.service';
import { DataSource, Repository } from 'typeorm';
import { T_UserEntity } from './entity/T_user.entity';
import { UserInfo } from './UserInfo';
export declare class UsersService {
    private emailService;
    private dataSource;
    private T_usersRepository;
    constructor(emailService: EmailService, dataSource: DataSource, T_usersRepository: Repository<T_UserEntity>);
    createUser(name: string, email: string, password: string): Promise<object>;
    private checkUserExists;
    private saveUser;
    private saveUserUsingQueryRunner;
    private saveUserUsingTransaction;
    private sendMemberJoinEmail;
    getUserInfo(userId: string): Promise<UserInfo>;
    dataEncryption(EncryptionData: string): Promise<string>;
}

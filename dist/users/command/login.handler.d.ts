import { Repository } from 'typeorm';
import { ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from 'src/common/auth/auth.service';
import { LoginCommand } from './login.command';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
export declare class LoginHandler implements ICommandHandler<LoginCommand> {
    private T_usersRepository;
    private authService;
    constructor(T_usersRepository: Repository<T_UserEntity>, authService: AuthService);
    execute(command: LoginCommand): Promise<{
        AccessToken: string;
        RefreshToken: string;
    }>;
    dataDecryption(email: string, password: string): Promise<string>;
}

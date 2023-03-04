import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DataSource, Repository } from 'typeorm';
import { CreateUserCommand } from './create-user.command';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
export declare class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private dataSource;
    private eventBus;
    private T_usersRepository;
    constructor(dataSource: DataSource, eventBus: EventBus, T_usersRepository: Repository<T_UserEntity>);
    execute(command: CreateUserCommand): Promise<void>;
    private checkUserExists;
    private saveUserUsingTransaction;
    dataEncryption(EncryptionData: string): Promise<string>;
}

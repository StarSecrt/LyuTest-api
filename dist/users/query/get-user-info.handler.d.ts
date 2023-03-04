import { IQueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import { GetUserInfoQuery } from './get-user-info.query';
import { UserInfo } from 'src/admin/users/UserInfo';
export declare class GetUserInfoQueryHandler implements IQueryHandler<GetUserInfoQuery> {
    private T_usersRepository;
    constructor(T_usersRepository: Repository<T_UserEntity>);
    execute(query: GetUserInfoQuery): Promise<UserInfo>;
}

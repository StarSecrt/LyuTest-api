import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import { GetUserInfoQuery } from './get-user-info.query';
import { UserInfo } from 'src/admin/users/UserInfo';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoQueryHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(
    @InjectRepository(T_UserEntity) private T_usersRepository: Repository<T_UserEntity>,
  ) { }

  async execute(query: GetUserInfoQuery): Promise<UserInfo> {
    const { userId } = query;

    const user = await this.T_usersRepository.findOne({
      where: { c_id: userId }
    });

    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다');
    }

    return {
      index: user.c_index,
      id: user.c_id,
      name: user.c_name,
      email: user.c_email,
    };
  }
  
}
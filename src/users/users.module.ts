import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersModule } from 'src/admin/users/users.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { EmailModule } from 'src/common/email/email.module';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([T_UserEntity]),
    AuthModule,
    CqrsModule,
    AdminUsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger ],
})
export class UsersModule {}

import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/common/auth/auth.module';
import { EmailModule } from 'src/common/email/email.module';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    EmailModule,
    AuthModule,
    TypeOrmModule.forFeature([T_UserEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger]
})
export class AdminUsersModule {}

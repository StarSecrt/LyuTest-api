import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersModule } from 'src/admin/users/users.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from '../email/email.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [
        EmailModule,
        AuthModule,
        UsersModule, AdminUsersModule,
        TypeOrmModule.forFeature([T_UserEntity]),
    ],
    providers: [Logger, LoginService],
    controllers: [LoginController]
})
export class LoginModule {}

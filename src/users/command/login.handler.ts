import { Repository } from 'typeorm';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/common/auth/auth.service';
import { LoginCommand } from './login.command';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @InjectRepository(T_UserEntity) private T_usersRepository: Repository<T_UserEntity>,
    private authService: AuthService,
  ) { }

  async execute(command: LoginCommand) {
    const { email, password } = command;

    const user = await this.T_usersRepository.findOne({
      where: { c_email: email }
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    let userAuth = await this.dataDecryption(email, password);
    if(userAuth != 'success'){
      console.log(userAuth)
      throw new UnauthorizedException(`logIn failed`)
    }

    const accessToken = this.authService.loginCreateAccessToken({
      index: user.c_index,
      id: user.c_id,
      name: user.c_name,
      email: user.c_email,
    })

    const refreshToken = this.authService.loginCreateRefreshToken({
      index: user.c_index,
      id: user.c_id,
      name: user.c_name,
      email: user.c_email,
    })

    return {
      AccessToken: accessToken,
      RefreshToken: refreshToken      
    };
    
    // return this.authService.login({
    //   index: user.c_index,
    //   id: user.c_id,
    //   name: user.c_name,
    //   email: user.c_email,
    // });
  }

  // Data 복호화 > Password
  async dataDecryption(email: string, password: string): Promise<string> {
    const userdata = await this.T_usersRepository.findOne({
      where: { c_email: email }
    });

    if (!userdata) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    if (userdata && (await bcrypt.compare(password, userdata.c_password))) {
      return 'success';
    } else {
      return 'failed';
    }
  }

}
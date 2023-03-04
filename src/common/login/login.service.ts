import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { UserSignInDto } from './dto/user-signin.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';

@Injectable()
export class LoginService {
    constructor(
      private emailService: EmailService,
      private dataSource: DataSource,
      private authService: AuthService,
      @InjectRepository(T_UserEntity) private T_usersRepository: Repository<T_UserEntity>,
    ) {}

    async login(userSignInDto: UserSignInDto): Promise<any> {
        const { email, password } = userSignInDto;
        const user = await this.T_usersRepository.findOne({
            where: { c_email: email }
        });

        if (!user) {
            throw new NotFoundException('사용자가 존재하지 않습니다');
        }

        // 인증 대기 상태인 경우 처리
        if (user.c_status == 'W') {
            console.log('인증 대기 상태입니다.');
            throw new NotFoundException('가입 인증 대기 상태입니다. 메일 인증 후 로그인이 가능합니다.');
        }
    
        let userAuth = await this.dataDecryption(email, password);
        if(userAuth != 'success'){
            // console.log(userAuth)
            throw new UnauthorizedException(`Login failed`)
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
    } 

    // Data 복호화 > Password
    async dataDecryption(email: string, password: string): Promise<string> {
        const userData = await this.T_usersRepository.findOne({
            where: { c_email: email }
    });
    // console.log(email);
    // console.log(password);

    if (!userData) {
        throw new NotFoundException('사용자가 존재하지 않습니다');
    }

    if (userData && (await bcrypt.compare(password, userData.c_password))) {
        return 'success';
    } else {
        return 'failed';
    }
  }

    // Reset Access Token
    async resetToken(userId: string): Promise<any> {
        const user = await this.T_usersRepository.findOne({
            where: { c_id: userId }
        });

        if (!user) {
        throw new NotFoundException('사용자가 존재하지 않습니다');
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
    }

    async verifyEmail(signupVerifyToken: string): Promise<object> {
        const user = await this.T_usersRepository.findOne({
            where: { 
                c_signupVerifyToken: signupVerifyToken,
                c_status: 'W'
            }
        });

        if (!user) {
            throw new NotFoundException('가입 대기중인 사용자가 존재하지 않습니다');
        } else {
            await this.dataSource.transaction(async manager => {
                // user.c_signupVerifyToken = '';
                user.c_status = 'S';
                user.c_update_user_index = 0;
                user.c_update_date = new Date();

                await manager.save(user);
            });
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
        //     index: user.c_index,
        //     id: user.c_id,
        //     name: user.c_name,
        //     email: user.c_email,
        // });
    }

}

import { Body, Controller, Get, Param, Post, Query, Headers, UseGuards, Inject, LoggerService, InternalServerErrorException, Logger } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AuthGuard } from 'src/auth.guard';
import { AuthRefreshGuard } from 'src/authrefresh.guard';
import { AuthService } from 'src/common/auth/auth.service';
import { VerifyEmailDto } from 'src/common/login/dto/verify-email.dto';
import { UserInfo } from 'src/admin/users/UserInfo';
import { UsersService } from './users.service';
import { string } from 'joi';
import { UserSignInDto } from 'src/common/login/dto/user-signin.dto';
import { UserSingUpDto } from 'src/admin/users/dto/user-signup.dto';

@Controller('usertest')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService, 
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}
  //Log 호출
  private printLoggerServiceLog(dto: any, LogTitle: string) {
    // this.logger.warn('warn: ' + JSON.stringify(dto));
    this.logger.log(`[Log] ` + LogTitle + `: `  + JSON.stringify(dto));
    // this.logger.verbose('verbose: ' + JSON.stringify(dto));
    // this.logger.debug('debug: ' + JSON.stringify(dto));
  }

  // @Post()
  // async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
  //   const { name, email, password } = createUserDto;
  //   await this.usersService.createUser(name, email, password);
  // }

  @Post()
  async createUser(@Body() userSingUpDto: UserSingUpDto): Promise<object> {
    // Create Log
    this.printLoggerServiceLog(userSingUpDto, `CreateUser`);
    const { name, email, password } = userSingUpDto;
    // return;
    return await this.usersService.createUser(name, email, password);
  }

  // @Post('/email-verify')
  // async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<string> {
  //   const { signupVerifyToken } = verifyEmailDto;

  //   return await this.usersService.verifyEmail(signupVerifyToken);
  // }

  // @Post('/login')
  // async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
  //   // Create Log
  //   this.printLoggerServiceLog(userLoginDto, `LoginUser`);
  //   const { email, password } = userLoginDto;

  //   return await this.usersService.login(userLoginDto);
  // }

  // @Get(':id')
  // async getUserInfo(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
  //   const jwtString = headers.authorization.split('Bearer ')[1];

  //   this.authService.verify(jwtString);

  //   return this.usersService.getUserInfo(userId);
  // }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserInfo(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

  // 비밀번호 암호화 테스트 
  @Post('/bcryptpassword')
  async bcryptpassword(@Body() userSignInDto: UserSignInDto): Promise<string> {
    const { email, password } = userSignInDto;

    return await this.usersService.bcryptpassword(userSignInDto);
  }

  // // Reset Token : RefreshToken
  // @UseGuards(AuthRefreshGuard) // Refresh Token 승인
  // @Get('/refresh/:id')
  // async getResetToken(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
  //   return this.usersService.resetToken(userId);
  // }

}

import { Body, Controller, Get, Inject, Logger, LoggerService, Param, Post, UseGuards, Headers, Query } from '@nestjs/common';
import { UserInfo } from 'src/admin/users/UserInfo';
import { AuthService } from 'src/common/auth/auth.service';
import { AuthRefreshGuard } from 'src/authrefresh.guard';
import { UserSignInDto } from './dto/user-signin.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService, 
  ) {}
  //Log 호출
  private printLoggerServiceLog(dto: any, LogTitle: string) {
    this.logger.log(`[Log] ` + LogTitle + `: `  + JSON.stringify(dto));
  }

  // Sing-in
  @Post()
  async login(@Body() userSignInDto: UserSignInDto): Promise<string> {
    // Create Log
    this.printLoggerServiceLog(userSignInDto, `LoginUser`);
    const { email, password } = userSignInDto;

    return await this.loginService.login(userSignInDto);
  }

  // Reset Token : RefreshToken
  @UseGuards(AuthRefreshGuard) // Refresh Token 승인
  @Get('/refresh/:id')
  async getResetToken(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
    return this.loginService.resetToken(userId);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<object> {
    const { signupVerifyToken } = verifyEmailDto;

    return await this.loginService.verifyEmail(signupVerifyToken);
  }
  
}

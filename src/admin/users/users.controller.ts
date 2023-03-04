import { Body, Controller, Inject, Logger, LoggerService, Post, Headers, Param, UseGuards, Get } from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth.guard';
import { UserSingUpDto } from './dto/user-signup.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(Logger) private readonly Logger: LoggerService,
  ) {}
   //Log 호출
   private printLoggerServiceLog(dto: any, LogTitle: string) {
    this.Logger.log(`[Log] ` + LogTitle + `: `  + JSON.stringify(dto));
  }

  @Post()
  async createUser(@Body() userSingUpDto: UserSingUpDto): Promise<object> {
    // Create Log
    this.printLoggerServiceLog(userSingUpDto, `CreateUser`);
    const { name, email, password } = userSingUpDto;
    // return;
    return await this.usersService.createUser(name, email, password);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserInfo(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

}

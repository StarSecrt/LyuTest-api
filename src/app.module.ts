import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import authConfig from './config/authConfig';
import { ExceptionModule } from './common/exception/exception.module';
import { LoggingModule } from './common/logging/logging.module';
import { BatchModule } from './batch/batch.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckController } from './common/health-check/health-check.controller';
import { AdminBpModule } from './admin/bp/bp.module';
import { AdminItemModule } from './admin/item/item.module';
import { AdminUsersModule } from './admin/users/users.module';
import { InterfacePoModule } from './interface/interface-po/interface-po.module';
import { InterfaceItemModule } from './interface/interface-item/interface-item.module';
import { InterfaceSoModule } from './interface/interface-so/interface-so.module';
import { AdminSystemModule } from './admin/system/system.module';
import { FileModule } from './common/file/file.module';
import { LoginModule } from './common/login/login.module';
import { CodeModule } from './admin/code/code.module';
import { AuthModule } from './common/auth/auth.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

@Module({
  imports: [
    // Common
    ExceptionModule,
    LoggingModule,
    FileModule,
    LoginModule,
    CodeModule,
    AuthModule,
    // Admin
    AdminBpModule,
    AdminItemModule,
    AdminUsersModule,
    AdminSystemModule,
    // Interface
    InterfacePoModule,
    InterfaceItemModule,
    InterfaceSoModule,
    // Root   
    ApiModule,
    BatchModule,
    TerminusModule,
    HttpModule,  
    UsersModule, 
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME, 
      password: process.env.DATABASE_PASSWORD, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      migrations: [__dirname + '/**/migrations/*.js'],
      migrationsTableName: 'migrations',
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',      
    }),
    
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       level: process.env.NODE_ENV === 'development' ? 'info' : 'silly',
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
    //       ),
    //     }),
    //   ],
    // }),         
    
  ],
  controllers: [AppController, HealthCheckController],
  providers: [],
})
export class AppModule { }

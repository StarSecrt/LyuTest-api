import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/common/email/email.service';
import { DataSource, Repository } from 'typeorm';
import { T_UserEntity } from './entity/T_user.entity';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { UserInfo } from './UserInfo';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private dataSource: DataSource,
    @InjectRepository(T_UserEntity) private T_usersRepository: Repository<T_UserEntity>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<object> {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(`Can't sign-up with Email ${email}`);
    }

    const signupVerifyToken = uuid.v1();

    // TypeORM Basic 
    // await this.saveUser(name, email, password, signupVerifyToken);
    
    // QueryRunner 이용
    // await this.saveUserUsingQueryRunner(name, email, password, signupVerifyToken);
    
    // Transaction 함수 이용
    try {
      await this.saveUserUsingTransaction(name, email, password, signupVerifyToken);
      await this.sendMemberJoinEmail(email, signupVerifyToken);

      console.log ('success')
      return { 'result': 'success'};
    } catch (error) {
      console.error (error);
      return error;
    }
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.T_usersRepository.findOne({
      where: { c_email: emailAddress }
    });

    return user !== null;
  }

  private async saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
    const user = new T_UserEntity();

    user.c_id = ulid();
    user.c_name = name;
    user.c_email = email;    
    user.c_password = await this.dataEncryption(password); //암호화 적용
    user.c_signupVerifyToken = signupVerifyToken;
    user.c_status = 'W';
    user.c_create_user_index = 0;
    user.c_create_date = new Date();
    user.c_update_user_index = 0;
    user.c_update_date = new Date();

    await this.T_usersRepository.save(user);
  }

  private async saveUserUsingQueryRunner(name: string, email: string, password: string, signupVerifyToken: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new T_UserEntity();
      user.c_id = ulid();
      user.c_name = name;
      user.c_email = email;
      user.c_password = await this.dataEncryption(password); //암호화 적용
      user.c_signupVerifyToken = signupVerifyToken;
      user.c_status = 'W';
      user.c_create_user_index = 0;
      user.c_create_date = new Date();
      user.c_update_user_index = 0;
      user.c_update_date = new Date();

      await queryRunner.manager.save(user);

      // throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다

      await queryRunner.commitTransaction();
    } catch (e) {
      // 에러가 발생하면 롤백
      // console.log('e');
      await queryRunner.rollbackTransaction();
    } finally {
      // 직접 생성한 QueryRunner는 해제시켜 주어야 함
      // console.log('release');
      await queryRunner.release();
    }
  }

  private async saveUserUsingTransaction(name: string, email: string, password: string, signupVerifyToken: string) {
    await this.dataSource.transaction(async manager => {
      const user = new T_UserEntity();

      user.c_id = ulid();
      user.c_name = name;
      user.c_email = email;
      user.c_password = await this.dataEncryption(password); //암호화 적용
      user.c_signupVerifyToken = signupVerifyToken;
      user.c_status = 'W';
      user.c_create_user_index = 0;
      user.c_create_date = new Date();
      user.c_update_user_index = 0;
      user.c_update_date = new Date();

      await manager.save(user);

      // throw new InternalServerErrorException();
    })
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.T_usersRepository.findOne({
      where: { c_id: userId, c_status: 'S' }
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
  
   // Data 암호화
   async dataEncryption(EncryptionData: string): Promise<string> {
    // console.log(EncryptionData);

    const bcryptSecret = await bcrypt.genSalt();
    // console.log(bcryptSecret);

    EncryptionData = await bcrypt.hash(EncryptionData, bcryptSecret);    
    // console.log(EncryptionData);

    return EncryptionData;
  }
}

import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserCommand } from './create-user.command';
import { UserCreatedEvent } from '../event/user-created.event';
import { TestEvent } from '../event/test.event';
import { T_UserEntity } from 'src/admin/users/entity/T_user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private dataSource: DataSource,
    private eventBus: EventBus,

    @InjectRepository(T_UserEntity) private T_usersRepository: Repository<T_UserEntity>,
  ) { }

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command;

    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUserUsingTransaction(name, email, password, signupVerifyToken);

    this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken));
    this.eventBus.publish(new TestEvent());
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.T_usersRepository.findOne({
      where: { c_email: emailAddress }
    });

    return user !== null;
  }

  private async saveUserUsingTransaction(name: string, email: string, password: string, signupVerifyToken: string) {
    await this.dataSource.transaction(async manager => {
      const user = new T_UserEntity();
      user.c_id = ulid();
      user.c_name = name;
      user.c_email = email;
      user.c_password = await this.dataEncryption(password); //암호화 적용
      user.c_signupVerifyToken = signupVerifyToken;

      await manager.save(user);
    })
  }

  // Data 암호화
  async dataEncryption(EncryptionData: string): Promise<string> {
    const bcryptSecret = await bcrypt.genSalt();
    EncryptionData = await bcrypt.hash(EncryptionData, bcryptSecret);    

    return EncryptionData;
  }
  
}
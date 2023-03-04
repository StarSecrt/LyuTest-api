"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserHandler = void 0;
const uuid = require("uuid");
const ulid_1 = require("ulid");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_user_command_1 = require("./create-user.command");
const user_created_event_1 = require("../event/user-created.event");
const test_event_1 = require("../event/test.event");
const T_user_entity_1 = require("../../admin/users/entity/T_user.entity");
const bcrypt = require("bcrypt");
let CreateUserHandler = class CreateUserHandler {
    constructor(dataSource, eventBus, T_usersRepository) {
        this.dataSource = dataSource;
        this.eventBus = eventBus;
        this.T_usersRepository = T_usersRepository;
    }
    async execute(command) {
        const { name, email, password } = command;
        const userExist = await this.checkUserExists(email);
        if (userExist) {
            throw new common_1.UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
        }
        const signupVerifyToken = uuid.v1();
        await this.saveUserUsingTransaction(name, email, password, signupVerifyToken);
        this.eventBus.publish(new user_created_event_1.UserCreatedEvent(email, signupVerifyToken));
        this.eventBus.publish(new test_event_1.TestEvent());
    }
    async checkUserExists(emailAddress) {
        const user = await this.T_usersRepository.findOne({
            where: { c_email: emailAddress }
        });
        return user !== null;
    }
    async saveUserUsingTransaction(name, email, password, signupVerifyToken) {
        await this.dataSource.transaction(async (manager) => {
            const user = new T_user_entity_1.T_UserEntity();
            user.c_id = (0, ulid_1.ulid)();
            user.c_name = name;
            user.c_email = email;
            user.c_password = await this.dataEncryption(password);
            user.c_signupVerifyToken = signupVerifyToken;
            await manager.save(user);
        });
    }
    async dataEncryption(EncryptionData) {
        const bcryptSecret = await bcrypt.genSalt();
        EncryptionData = await bcrypt.hash(EncryptionData, bcryptSecret);
        return EncryptionData;
    }
};
CreateUserHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.CommandHandler)(create_user_command_1.CreateUserCommand),
    __param(2, (0, typeorm_1.InjectRepository)(T_user_entity_1.T_UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        cqrs_1.EventBus,
        typeorm_2.Repository])
], CreateUserHandler);
exports.CreateUserHandler = CreateUserHandler;
//# sourceMappingURL=create-user.handler.js.map
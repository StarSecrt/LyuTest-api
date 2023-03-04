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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_service_1 = require("../../common/email/email.service");
const typeorm_2 = require("typeorm");
const T_user_entity_1 = require("./entity/T_user.entity");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const ulid_1 = require("ulid");
let UsersService = class UsersService {
    constructor(emailService, dataSource, T_usersRepository) {
        this.emailService = emailService;
        this.dataSource = dataSource;
        this.T_usersRepository = T_usersRepository;
    }
    async createUser(name, email, password) {
        const userExist = await this.checkUserExists(email);
        if (userExist) {
            throw new common_1.UnprocessableEntityException(`Can't sign-up with Email ${email}`);
        }
        const signupVerifyToken = uuid.v1();
        try {
            await this.saveUserUsingTransaction(name, email, password, signupVerifyToken);
            await this.sendMemberJoinEmail(email, signupVerifyToken);
            console.log('success');
            return { 'result': 'success' };
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async checkUserExists(emailAddress) {
        const user = await this.T_usersRepository.findOne({
            where: { c_email: emailAddress }
        });
        return user !== null;
    }
    async saveUser(name, email, password, signupVerifyToken) {
        const user = new T_user_entity_1.T_UserEntity();
        user.c_id = (0, ulid_1.ulid)();
        user.c_name = name;
        user.c_email = email;
        user.c_password = await this.dataEncryption(password);
        user.c_signupVerifyToken = signupVerifyToken;
        user.c_status = 'W';
        user.c_create_user_index = 0;
        user.c_create_date = new Date();
        user.c_update_user_index = 0;
        user.c_update_date = new Date();
        await this.T_usersRepository.save(user);
    }
    async saveUserUsingQueryRunner(name, email, password, signupVerifyToken) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = new T_user_entity_1.T_UserEntity();
            user.c_id = (0, ulid_1.ulid)();
            user.c_name = name;
            user.c_email = email;
            user.c_password = await this.dataEncryption(password);
            user.c_signupVerifyToken = signupVerifyToken;
            user.c_status = 'W';
            user.c_create_user_index = 0;
            user.c_create_date = new Date();
            user.c_update_user_index = 0;
            user.c_update_date = new Date();
            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async saveUserUsingTransaction(name, email, password, signupVerifyToken) {
        await this.dataSource.transaction(async (manager) => {
            const user = new T_user_entity_1.T_UserEntity();
            user.c_id = (0, ulid_1.ulid)();
            user.c_name = name;
            user.c_email = email;
            user.c_password = await this.dataEncryption(password);
            user.c_signupVerifyToken = signupVerifyToken;
            user.c_status = 'W';
            user.c_create_user_index = 0;
            user.c_create_date = new Date();
            user.c_update_user_index = 0;
            user.c_update_date = new Date();
            await manager.save(user);
        });
    }
    async sendMemberJoinEmail(email, signupVerifyToken) {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }
    async getUserInfo(userId) {
        const user = await this.T_usersRepository.findOne({
            where: { c_id: userId, c_status: 'S' }
        });
        if (!user) {
            throw new common_1.NotFoundException('사용자가 존재하지 않습니다');
        }
        return {
            index: user.c_index,
            id: user.c_id,
            name: user.c_name,
            email: user.c_email,
        };
    }
    async dataEncryption(EncryptionData) {
        const bcryptSecret = await bcrypt.genSalt();
        EncryptionData = await bcrypt.hash(EncryptionData, bcryptSecret);
        return EncryptionData;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(T_user_entity_1.T_UserEntity)),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        typeorm_2.DataSource,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
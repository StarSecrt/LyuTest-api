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
exports.LoginHandler = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../../common/auth/auth.service");
const login_command_1 = require("./login.command");
const T_user_entity_1 = require("../../admin/users/entity/T_user.entity");
const bcrypt = require("bcrypt");
let LoginHandler = class LoginHandler {
    constructor(T_usersRepository, authService) {
        this.T_usersRepository = T_usersRepository;
        this.authService = authService;
    }
    async execute(command) {
        const { email, password } = command;
        const user = await this.T_usersRepository.findOne({
            where: { c_email: email }
        });
        if (!user) {
            throw new common_1.NotFoundException('유저가 존재하지 않습니다');
        }
        let userAuth = await this.dataDecryption(email, password);
        if (userAuth != 'success') {
            console.log(userAuth);
            throw new common_1.UnauthorizedException(`logIn failed`);
        }
        const accessToken = this.authService.loginCreateAccessToken({
            index: user.c_index,
            id: user.c_id,
            name: user.c_name,
            email: user.c_email,
        });
        const refreshToken = this.authService.loginCreateRefreshToken({
            index: user.c_index,
            id: user.c_id,
            name: user.c_name,
            email: user.c_email,
        });
        return {
            AccessToken: accessToken,
            RefreshToken: refreshToken
        };
    }
    async dataDecryption(email, password) {
        const userdata = await this.T_usersRepository.findOne({
            where: { c_email: email }
        });
        if (!userdata) {
            throw new common_1.NotFoundException('유저가 존재하지 않습니다');
        }
        if (userdata && (await bcrypt.compare(password, userdata.c_password))) {
            return 'success';
        }
        else {
            return 'failed';
        }
    }
};
LoginHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.CommandHandler)(login_command_1.LoginCommand),
    __param(0, (0, typeorm_2.InjectRepository)(T_user_entity_1.T_UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService])
], LoginHandler);
exports.LoginHandler = LoginHandler;
//# sourceMappingURL=login.handler.js.map
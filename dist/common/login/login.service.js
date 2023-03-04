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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const typeorm_1 = require("typeorm");
const email_service_1 = require("../email/email.service");
const bcrypt = require("bcrypt");
const common_2 = require("@nestjs/typeorm/dist/common");
const T_user_entity_1 = require("../../admin/users/entity/T_user.entity");
let LoginService = class LoginService {
    constructor(emailService, dataSource, authService, T_usersRepository) {
        this.emailService = emailService;
        this.dataSource = dataSource;
        this.authService = authService;
        this.T_usersRepository = T_usersRepository;
    }
    async login(userSignInDto) {
        const { email, password } = userSignInDto;
        const user = await this.T_usersRepository.findOne({
            where: { c_email: email }
        });
        if (!user) {
            throw new common_1.NotFoundException('사용자가 존재하지 않습니다');
        }
        if (user.c_status == 'W') {
            console.log('인증 대기 상태입니다.');
            throw new common_1.NotFoundException('가입 인증 대기 상태입니다. 메일 인증 후 로그인이 가능합니다.');
        }
        let userAuth = await this.dataDecryption(email, password);
        if (userAuth != 'success') {
            throw new common_1.UnauthorizedException(`Login failed`);
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
        const userData = await this.T_usersRepository.findOne({
            where: { c_email: email }
        });
        if (!userData) {
            throw new common_1.NotFoundException('사용자가 존재하지 않습니다');
        }
        if (userData && (await bcrypt.compare(password, userData.c_password))) {
            return 'success';
        }
        else {
            return 'failed';
        }
    }
    async resetToken(userId) {
        const user = await this.T_usersRepository.findOne({
            where: { c_id: userId }
        });
        if (!user) {
            throw new common_1.NotFoundException('사용자가 존재하지 않습니다');
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
    async verifyEmail(signupVerifyToken) {
        const user = await this.T_usersRepository.findOne({
            where: {
                c_signupVerifyToken: signupVerifyToken,
                c_status: 'W'
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('가입 대기중인 사용자가 존재하지 않습니다');
        }
        else {
            await this.dataSource.transaction(async (manager) => {
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
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_2.InjectRepository)(T_user_entity_1.T_UserEntity)),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        typeorm_1.DataSource,
        auth_service_1.AuthService,
        typeorm_1.Repository])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map
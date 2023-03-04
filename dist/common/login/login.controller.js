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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const authrefresh_guard_1 = require("../../authrefresh.guard");
const user_signin_dto_1 = require("./dto/user-signin.dto");
const verify_email_dto_1 = require("./dto/verify-email.dto");
const login_service_1 = require("./login.service");
let LoginController = class LoginController {
    constructor(loginService, authService, logger) {
        this.loginService = loginService;
        this.authService = authService;
        this.logger = logger;
    }
    printLoggerServiceLog(dto, LogTitle) {
        this.logger.log(`[Log] ` + LogTitle + `: ` + JSON.stringify(dto));
    }
    async login(userSignInDto) {
        this.printLoggerServiceLog(userSignInDto, `LoginUser`);
        const { email, password } = userSignInDto;
        return await this.loginService.login(userSignInDto);
    }
    async getResetToken(headers, userId) {
        return this.loginService.resetToken(userId);
    }
    async verifyEmail(verifyEmailDto) {
        const { signupVerifyToken } = verifyEmailDto;
        return await this.loginService.verifyEmail(signupVerifyToken);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signin_dto_1.UserSignInDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(authrefresh_guard_1.AuthRefreshGuard),
    (0, common_1.Get)('/refresh/:id'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getResetToken", null);
__decorate([
    (0, common_1.Post)('/email-verify'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "verifyEmail", null);
LoginController = __decorate([
    (0, common_1.Controller)('login'),
    __param(2, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        auth_service_1.AuthService, Object])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map
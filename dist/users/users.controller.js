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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth.guard");
const auth_service_1 = require("../common/auth/auth.service");
const users_service_1 = require("./users.service");
const user_signin_dto_1 = require("../common/login/dto/user-signin.dto");
const user_signup_dto_1 = require("../admin/users/dto/user-signup.dto");
let UsersController = class UsersController {
    constructor(usersService, authService, logger) {
        this.usersService = usersService;
        this.authService = authService;
        this.logger = logger;
    }
    printLoggerServiceLog(dto, LogTitle) {
        this.logger.log(`[Log] ` + LogTitle + `: ` + JSON.stringify(dto));
    }
    async createUser(userSingUpDto) {
        this.printLoggerServiceLog(userSingUpDto, `CreateUser`);
        const { name, email, password } = userSingUpDto;
        return await this.usersService.createUser(name, email, password);
    }
    async getUserInfo(headers, userId) {
        return this.usersService.getUserInfo(userId);
    }
    async bcryptpassword(userSignInDto) {
        const { email, password } = userSignInDto;
        return await this.usersService.bcryptpassword(userSignInDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signup_dto_1.UserSingUpDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Post)('/bcryptpassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signin_dto_1.UserSignInDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "bcryptpassword", null);
UsersController = __decorate([
    (0, common_1.Controller)('usertest'),
    __param(2, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService, Object])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
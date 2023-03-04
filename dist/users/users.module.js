"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../admin/users/users.module");
const auth_module_1 = require("../common/auth/auth.module");
const email_module_1 = require("../common/email/email.module");
const T_user_entity_1 = require("../admin/users/entity/T_user.entity");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_module_1.EmailModule,
            typeorm_1.TypeOrmModule.forFeature([T_user_entity_1.T_UserEntity]),
            auth_module_1.AuthModule,
            cqrs_1.CqrsModule,
            users_module_1.AdminUsersModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, common_1.Logger],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map
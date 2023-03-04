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
exports.GetUserInfoQueryHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const T_user_entity_1 = require("../../admin/users/entity/T_user.entity");
const get_user_info_query_1 = require("./get-user-info.query");
let GetUserInfoQueryHandler = class GetUserInfoQueryHandler {
    constructor(T_usersRepository) {
        this.T_usersRepository = T_usersRepository;
    }
    async execute(query) {
        const { userId } = query;
        const user = await this.T_usersRepository.findOne({
            where: { c_id: userId }
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
};
GetUserInfoQueryHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_user_info_query_1.GetUserInfoQuery),
    __param(0, (0, typeorm_1.InjectRepository)(T_user_entity_1.T_UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GetUserInfoQueryHandler);
exports.GetUserInfoQueryHandler = GetUserInfoQueryHandler;
//# sourceMappingURL=get-user-info.handler.js.map
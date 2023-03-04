"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBpModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const api_module_1 = require("../../api/api.module");
const auth_module_1 = require("../../common/auth/auth.module");
const T_business_partner_entity_1 = require("./entity/T_business_partner.entity");
let AdminBpModule = class AdminBpModule {
};
AdminBpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([T_business_partner_entity_1.T_BusinessPartnerEntity]),
            auth_module_1.AuthModule,
            api_module_1.ApiModule
        ]
    })
], AdminBpModule);
exports.AdminBpModule = AdminBpModule;
//# sourceMappingURL=bp.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const T_business_partner_entity_1 = require("../../admin/bp/entity/T_business_partner.entity");
const api_module_1 = require("../../api/api.module");
const auth_module_1 = require("../../common/auth/auth.module");
const T_interface_item_entity_1 = require("./entity/T_interface_item.entity");
const interface_item_controller_1 = require("./interface-item.controller");
const interface_item_service_1 = require("./interface-item.service");
let InterfaceItemModule = class InterfaceItemModule {
};
InterfaceItemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([T_interface_item_entity_1.T_InterfaceItemEntity, T_business_partner_entity_1.T_BusinessPartnerEntity]),
            auth_module_1.AuthModule,
            api_module_1.ApiModule,
        ],
        controllers: [interface_item_controller_1.InterfaceItemController],
        providers: [interface_item_service_1.InterfaceItemService, common_1.Logger]
    })
], InterfaceItemModule);
exports.InterfaceItemModule = InterfaceItemModule;
//# sourceMappingURL=interface-item.module.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.T_InterfaceItemEntity = void 0;
const typeorm_1 = require("typeorm");
let T_InterfaceItemEntity = class T_InterfaceItemEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_index", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_aspid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_slrid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_item_header_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_item_line_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_reference_color", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_mixing_ratio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_supply_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], T_InterfaceItemEntity.prototype, "c_item_reg_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_image1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_image2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_image3", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_image4", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_item_image5", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_internal_barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_external_barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_available_stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'I' }),
    __metadata("design:type", String)
], T_InterfaceItemEntity.prototype, "c_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_create_user_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], T_InterfaceItemEntity.prototype, "c_create_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_InterfaceItemEntity.prototype, "c_update_user_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], T_InterfaceItemEntity.prototype, "c_update_date", void 0);
T_InterfaceItemEntity = __decorate([
    (0, typeorm_1.Entity)('T_INTERFACE_ITEM')
], T_InterfaceItemEntity);
exports.T_InterfaceItemEntity = T_InterfaceItemEntity;
//# sourceMappingURL=T_interface_item.entity.js.map
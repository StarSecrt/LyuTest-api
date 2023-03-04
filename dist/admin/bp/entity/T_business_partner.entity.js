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
exports.T_BusinessPartnerEntity = void 0;
const typeorm_1 = require("typeorm");
let T_BusinessPartnerEntity = class T_BusinessPartnerEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], T_BusinessPartnerEntity.prototype, "c_index", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_registration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_representative_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_item", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'B' }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_group_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '거래처' }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_group_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Y' }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_headoffice_yn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_headoffice_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_post_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_manager", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_cell_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_fax", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_mail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_bank_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_bank_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_bank_account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_pos_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_BusinessPartnerEntity.prototype, "c_pos_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_BusinessPartnerEntity.prototype, "c_pos_shopid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'I' }),
    __metadata("design:type", String)
], T_BusinessPartnerEntity.prototype, "c_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_BusinessPartnerEntity.prototype, "c_create_user_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], T_BusinessPartnerEntity.prototype, "c_create_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], T_BusinessPartnerEntity.prototype, "c_update_user_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], T_BusinessPartnerEntity.prototype, "c_update_date", void 0);
T_BusinessPartnerEntity = __decorate([
    (0, typeorm_1.Entity)('T_BUSINESS_PARTNER')
], T_BusinessPartnerEntity);
exports.T_BusinessPartnerEntity = T_BusinessPartnerEntity;
//# sourceMappingURL=T_business_partner.entity.js.map
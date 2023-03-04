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
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_service_1 = require("./api.service");
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    index(version) {
        return `Hello, API ${version}`;
    }
    getPosBarcodeList(barcode) {
        return this.apiService.getPosBarcodeList(barcode);
    }
    getPosItemList(aspid, slrid, itemid) {
        return this.apiService.getPosItemList(aspid, slrid, itemid);
    }
    getTest() {
        const baseUrl = `http://api.dsds.co.kr/jupiter/get_slrtd`;
        return this.apiService.getTest(baseUrl);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.HostParam)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], ApiController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/pos_eos/barcode/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getPosBarcodeList", null);
__decorate([
    (0, common_1.Get)('/pos_eos/itemlist/:aspid/:slrid/:itemid'),
    __param(0, (0, common_1.Param)('aspid')),
    __param(1, (0, common_1.Param)('slrid')),
    __param(2, (0, common_1.Param)('itemid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getPosItemList", null);
__decorate([
    (0, common_1.Get)('/pos_eos/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getTest", null);
ApiController = __decorate([
    (0, swagger_1.ApiTags)('apirequest'),
    (0, common_1.Controller)({ host: ':version.api.localhost' }),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map
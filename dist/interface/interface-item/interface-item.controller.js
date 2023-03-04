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
exports.InterfaceItemController = void 0;
const common_1 = require("@nestjs/common");
const interface_item_service_1 = require("./interface-item.service");
let InterfaceItemController = class InterfaceItemController {
    constructor(interfaceItemService, Logger) {
        this.interfaceItemService = interfaceItemService;
        this.Logger = Logger;
    }
    getPosItemList(aspid, slrid, itemid) {
        return this.interfaceItemService.getPosItemList(aspid, slrid, itemid);
    }
    getPosItemList2(bpcode) {
        return this.interfaceItemService.getPosItemListBP(bpcode);
    }
    interfaceItemList(page) {
        return this.interfaceItemService.interfaceItemList(page);
    }
    interfaceItemList_query(page) {
        return this.interfaceItemService.interfaceItemList_query(page);
    }
    interfaceItemList_builder(page) {
        return this.interfaceItemService.interfaceItemList_builder(page);
    }
    selectTestList() {
        return this.interfaceItemService.selectTestList();
    }
    selectTestList2() {
        return this.interfaceItemService.selectTestList2();
    }
    selectTestList3(bpcode) {
        return this.interfaceItemService.selectTestFindOne(bpcode);
    }
};
__decorate([
    (0, common_1.Get)('/pos_eos/itemlistid/:aspid/:slrid/:itemid'),
    __param(0, (0, common_1.Param)('aspid')),
    __param(1, (0, common_1.Param)('slrid')),
    __param(2, (0, common_1.Param)('itemid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], InterfaceItemController.prototype, "getPosItemList", null);
__decorate([
    (0, common_1.Get)('/pos_eos/bpitemlist/:bpcode'),
    __param(0, (0, common_1.Param)('bpcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InterfaceItemController.prototype, "getPosItemList2", null);
__decorate([
    (0, common_1.Get)('/list/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InterfaceItemController.prototype, "interfaceItemList", null);
__decorate([
    (0, common_1.Get)('/list2/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InterfaceItemController.prototype, "interfaceItemList_query", null);
__decorate([
    (0, common_1.Get)('/list3/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InterfaceItemController.prototype, "interfaceItemList_builder", null);
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterfaceItemController.prototype, "selectTestList", null);
__decorate([
    (0, common_1.Get)('/test2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterfaceItemController.prototype, "selectTestList2", null);
__decorate([
    (0, common_1.Get)('/test2/:bpcode'),
    __param(0, (0, common_1.Param)('bpcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InterfaceItemController.prototype, "selectTestList3", null);
InterfaceItemController = __decorate([
    (0, common_1.Controller)('interface/item'),
    __param(1, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [interface_item_service_1.InterfaceItemService, Object])
], InterfaceItemController);
exports.InterfaceItemController = InterfaceItemController;
//# sourceMappingURL=interface-item.controller.js.map
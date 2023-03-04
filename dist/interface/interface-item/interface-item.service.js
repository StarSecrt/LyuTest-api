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
exports.InterfaceItemService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const typeorm_1 = require("@nestjs/typeorm");
const T_business_partner_entity_1 = require("../../admin/bp/entity/T_business_partner.entity");
const api_service_1 = require("../../api/api.service");
const typeorm_2 = require("typeorm");
const T_interface_item_entity_1 = require("./entity/T_interface_item.entity");
let InterfaceItemService = class InterfaceItemService {
    constructor(T_InterfaceItemRepository, T_BusinessPartnerRepository, dataSource, apiService, logger) {
        this.T_InterfaceItemRepository = T_InterfaceItemRepository;
        this.T_BusinessPartnerRepository = T_BusinessPartnerRepository;
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.logger = logger;
    }
    PrintLoggerServiceLog(logTitle, logData) {
        this.logger.log(`[Log] ` + logTitle + `: ` + JSON.stringify(logData));
    }
    selectTestList() {
        const selectQuery = `select * from public."T_BUSINESS_PARTNER" where c_code like 'P%'`;
        const resData = this.dataSource.query(selectQuery);
        return resData;
    }
    async selectTestList2() {
        const resData = await this.dataSource.manager
            .createQueryBuilder()
            .select("T_BUSINESS_PARTNER")
            .from(T_business_partner_entity_1.T_BusinessPartnerEntity, "T_BUSINESS_PARTNER")
            .where("c_code like :code", { code: 'P%' })
            .orderBy({
            "c_index": "DESC"
        })
            .getMany();
        return resData;
    }
    selectTestFindOne(bpCode) {
        const resData = this.T_BusinessPartnerRepository.findOne({
            where: { c_code: bpCode }
        });
        return resData;
    }
    async interfaceItemList(page) {
        const resData = this.T_InterfaceItemRepository.find({
            where: { c_item_size: "S" },
            order: {
                c_item_id: "DESC",
                c_index: "DESC"
            },
            skip: (page - 1) * 10,
            take: 10
        });
        return resData;
    }
    async interfaceItemList_query(page) {
        const selectQuery = `select * from public."T_INTERFACE_ITEM" where c_index > 500 order by c_index desc`;
        const resData = this.dataSource.query(selectQuery);
        return resData;
    }
    async interfaceItemList_builder(page) {
        const resData = await this.dataSource.manager
            .createQueryBuilder()
            .select("T_INTERFACE_ITEM")
            .from(T_interface_item_entity_1.T_InterfaceItemEntity, "T_INTERFACE_ITEM")
            .where("c_index > :index and c_item_id > :item_id", { index: 400, item_id: 2200 })
            .andWhere("c_item_size = :item_size", { item_size: 'XL' })
            .orderBy({ "c_index": "DESC" })
            .skip((page - 1) * 10)
            .take(10)
            .getMany();
        return resData;
    }
    async getPosItemList(aspid, slrid, itemid) {
        let DateTime = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
        const data = await this.apiService.getPosItemList(aspid, slrid, itemid);
        const resData = JSON.stringify(data);
        const parseData = JSON.parse(resData);
        console.log(`Data save start`);
        const resItemData = parseData.itemlist;
        let Widx = 0;
        let CreateCount = 0;
        let UpdateCount = 0;
        let ErrorCount = 0;
        let saveResult;
        while (Widx < resItemData.length) {
            const content = resItemData[Widx];
            saveResult = await this.savePosItem(aspid, slrid, resItemData[Widx]);
            if (saveResult == 'create') {
                CreateCount++;
            }
            else if (saveResult == 'update') {
                UpdateCount++;
            }
            else if (saveResult == 'error') {
                ErrorCount++;
            }
            Widx++;
        }
        console.log(`Data save end`);
        let returnMsg = { 'DateTime': DateTime, 'Total Count': Widx, 'CreateCount': CreateCount, 'UpdateCount': UpdateCount, 'ErrorCount': ErrorCount };
        this.PrintLoggerServiceLog('Interface Item Save Result', returnMsg);
        return returnMsg;
    }
    async getPosItemListBP(bpcode) {
        let DateTime = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
        let bpData = await this.T_BusinessPartnerRepository.findOne({
            where: { c_code: bpcode }
        });
        if (!bpData) {
            throw new exceptions_1.NotFoundException(`Can't find with BP Code : ${bpcode}`);
        }
        let aspid = bpData.c_pos_id;
        let slrid = bpData.c_pos_shopid;
        let itemid = 0;
        if (!aspid) {
            throw new exceptions_1.NotFoundException(`Can't find POS ID with BP Code : ${bpcode}`);
        }
        const data = await this.apiService.getPosItemList(aspid, slrid, itemid);
        const resData = JSON.stringify(data);
        const parseData = JSON.parse(resData);
        console.log(`Data save start`);
        const resItemData = parseData.itemlist;
        let Widx = 0;
        let CreateCount = 0;
        let UpdateCount = 0;
        let ErrorCount = 0;
        let saveResult;
        while (Widx < resItemData.length) {
            const content = resItemData[Widx];
            saveResult = await this.savePosItem(aspid, slrid, resItemData[Widx]);
            if (saveResult == 'create') {
                CreateCount++;
            }
            else if (saveResult == 'update') {
                UpdateCount++;
            }
            else if (saveResult == 'error') {
                ErrorCount++;
            }
            ;
            Widx++;
        }
        console.log(`Data save end`);
        let returnMsg = { 'DateTime': DateTime, 'Total Count': Widx, 'CreateCount': CreateCount, 'UpdateCount': UpdateCount, 'ErrorCount': ErrorCount };
        this.PrintLoggerServiceLog('Interface Item Save Result', returnMsg);
        return returnMsg;
    }
    async savePosItem(aspid, slrid, itemData) {
        const { itemid, itemcode, itemname, colorname, sizename, fiber, wholeprice, regidate, image0, image1, image2, image3, image4, eancode, barcode, lastqty } = itemData;
        const posItemFind = await this.T_InterfaceItemRepository.findOne({
            where: { c_aspid: aspid, c_slrid: slrid, c_item_id: itemid }
        });
        try {
            if (!posItemFind) {
                await this.dataSource.transaction(async (manager) => {
                    const interfaceItem = new T_interface_item_entity_1.T_InterfaceItemEntity();
                    interfaceItem.c_aspid = aspid;
                    interfaceItem.c_slrid = slrid;
                    interfaceItem.c_item_id = itemid;
                    interfaceItem.c_item_code = itemcode;
                    interfaceItem.c_item_name = itemname;
                    interfaceItem.c_reference_color = colorname;
                    interfaceItem.c_item_size = sizename;
                    interfaceItem.c_mixing_ratio = fiber;
                    interfaceItem.c_supply_price = wholeprice;
                    interfaceItem.c_item_reg_date = regidate;
                    interfaceItem.c_item_image1 = image0;
                    interfaceItem.c_item_image2 = image1;
                    interfaceItem.c_item_image3 = image2;
                    interfaceItem.c_item_image4 = image3;
                    interfaceItem.c_item_image5 = image4;
                    interfaceItem.c_internal_barcode = eancode;
                    interfaceItem.c_external_barcode = barcode;
                    interfaceItem.c_available_stock = lastqty;
                    interfaceItem.c_status = 'I';
                    interfaceItem.c_create_user_index = 0;
                    interfaceItem.c_create_date = new Date();
                    interfaceItem.c_update_user_index = 0;
                    interfaceItem.c_update_date = new Date();
                    await manager.save(interfaceItem);
                });
            }
            else {
                await this.dataSource.transaction(async (manager) => {
                    posItemFind.c_item_id = itemid;
                    posItemFind.c_item_code = itemcode;
                    posItemFind.c_item_name = itemname;
                    posItemFind.c_reference_color = colorname;
                    posItemFind.c_item_size = sizename;
                    posItemFind.c_mixing_ratio = fiber;
                    posItemFind.c_supply_price = wholeprice;
                    posItemFind.c_item_reg_date = regidate;
                    posItemFind.c_item_image1 = image0;
                    posItemFind.c_item_image2 = image1;
                    posItemFind.c_item_image3 = image2;
                    posItemFind.c_item_image4 = image3;
                    posItemFind.c_item_image5 = image4;
                    posItemFind.c_internal_barcode = eancode;
                    posItemFind.c_external_barcode = barcode;
                    posItemFind.c_available_stock = lastqty;
                    posItemFind.c_status = 'U';
                    posItemFind.c_update_user_index = 0;
                    posItemFind.c_update_date = new Date();
                    await manager.save(posItemFind);
                });
            }
            ;
            if (!posItemFind) {
                return `create`;
            }
            else {
                return `update`;
            }
            ;
        }
        catch (error) {
            this.PrintLoggerServiceLog('Interface Item Save Error', itemid);
            return `error`;
        }
    }
};
InterfaceItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(T_interface_item_entity_1.T_InterfaceItemEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(T_business_partner_entity_1.T_BusinessPartnerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        api_service_1.ApiService,
        common_1.Logger])
], InterfaceItemService);
exports.InterfaceItemService = InterfaceItemService;
//# sourceMappingURL=interface-item.service.js.map
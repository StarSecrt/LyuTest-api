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
exports.ApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ApiService = class ApiService {
    constructor(HttpService) {
        this.HttpService = HttpService;
    }
    async getCommonAPI(baseUrl) {
        try {
            const result = await this.HttpService
                .get(baseUrl)
                .toPromise();
            return result.data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async getTest(baseUrl) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.HttpService
                .get(baseUrl, {
                params: {
                    auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                    barcode: '27909548856557'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async postTest(baseUrl, reqBody) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.HttpService
                .post(baseUrl, reqBody, {
                params: {
                    auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                    barcode: '27909548856557'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async getPosBarcodeList(barcode) {
        try {
            console.log('POS Barcode List 요청 시작');
            const baseUrl = `http://api.dsds.co.kr/jupiter/get_slrtd`;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.HttpService
                .get(baseUrl, {
                params: {
                    auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                    barcode: barcode
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async getPosItemList(aspid, slrid, itemid) {
        try {
            console.log('POS Item List 요청 시작');
            const baseUrl = `http://api.dsds.co.kr/jupiter/get_itemmt`;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.HttpService
                .get(baseUrl, {
                params: {
                    auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                    aspid: aspid,
                    slrid: slrid,
                    itemid: itemid
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            return data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
};
ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map
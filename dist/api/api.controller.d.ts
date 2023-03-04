import { ApiService } from './api.service';
export declare class ApiController {
    private apiService;
    constructor(apiService: ApiService);
    index(version: string): string;
    getPosBarcodeList(barcode: string): Promise<object>;
    getPosItemList(aspid: number, slrid: number, itemid: number): Promise<object>;
    getTest(): Promise<any>;
}

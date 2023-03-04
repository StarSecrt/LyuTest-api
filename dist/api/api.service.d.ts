import { HttpService } from '@nestjs/axios';
export declare class ApiService {
    private readonly HttpService;
    logger: any;
    constructor(HttpService: HttpService);
    getCommonAPI(baseUrl: string): Promise<any>;
    getTest(baseUrl: string): Promise<any>;
    postTest(baseUrl: string, reqBody: object): Promise<object>;
    getPosBarcodeList(barcode: string): Promise<object>;
    getPosItemList(aspid: number, slrid: number, itemid: number): Promise<object>;
}

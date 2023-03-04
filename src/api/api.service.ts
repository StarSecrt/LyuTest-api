import { HttpService } from '@nestjs/axios';
import Axios, {
    AxiosInstance,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
  } from 'axios';
import { Injectable } from '@nestjs/common';
// import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { array, object } from 'joi';

@Injectable()
export class ApiService {
    logger: any;
    constructor(
        private readonly HttpService: HttpService
    ) {}   

    // 공통 API > Get
    async getCommonAPI(baseUrl: string): Promise<any> {
        try {
            const result = await this.HttpService
            .get(
                baseUrl,
            )
            .toPromise(); // toPromiss 변경 방법 확인

            return result.data;
        } catch (error) {
            console.error (error);
            return error;
        }
    }

    // New 공통 API > Get 
    async getTest(baseUrl: string): Promise<any> {
        try{
            const { data } = await firstValueFrom(this.HttpService
                .get<any>(
                    baseUrl,
                    {
                        params: {
                            auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                            barcode: '27909548856557'
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            );
            return data;
        } catch (error) {
            console.error (error);
            return error;
        }        
    }

    // New 공통 API > Post
    async postTest(baseUrl: string, reqBody: object): Promise<object> {
        try{
            const { data } = await firstValueFrom(this.HttpService
                .post<object>(
                    baseUrl, 
                    reqBody, 
                    {
                        params: {
                            auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                            barcode: '27909548856557'
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            );
            return data;
        } catch (error) {
            console.error (error);
            return error;
        }        
    }

    // // API Get Sample
    // async getTest(url: string): Promise<object> {
    //     try{
    //         const { data } = await firstValueFrom(
    //             this.httpService
    //             .get<object>(
    //                 url
    //             )
    //             // .pipe(catchError((error: AxiosError) => {
    //             //     this.logger.error(error.response.data);
    //             //     throw 'An error happened!';
    //             // }),
    //             // ),
    //         );
    //         return data;
    //     } catch (error) {
            // console.error (error);
            // return error;
    //     }        
    // }

    // 
    async getPosBarcodeList(barcode: string): Promise<object> {
        try {
            console.log('POS Barcode List 요청 시작');
            const baseUrl = `http://api.dsds.co.kr/jupiter/get_slrtd`;
            const { data } = await firstValueFrom(this.HttpService            
                .get<any>(
                    baseUrl,
                    {
                        params: {
                            auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                            barcode: barcode
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            );
            return data;
        } catch (error) {
            console.error (error);
            return error;
        }
    }

    async getPosItemList(aspid: number, slrid: number, itemid: number): Promise<object> {
        try {
            console.log('POS Item List 요청 시작');
            const baseUrl = `http://api.dsds.co.kr/jupiter/get_itemmt`;
            const { data } = await firstValueFrom(this.HttpService            
                .get<any>(
                    baseUrl,
                    {
                        params: {
                            auth_key: 'ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09',
                            aspid: aspid,
                            slrid: slrid,
                            itemid: itemid
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            );
            return data;
        } catch (error) {
            console.error (error);
            return error;
        }
    }

   

}




import { Controller, Get, Post, Body, HostParam, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { string } from 'joi';
import { ApiService } from './api.service';

// @Controller({ host: 'api.localhost' })
// export class ApiController {
//   @Get()
//   index(): string {
//     return 'Hello, API';
//   }
// }

@ApiTags('apirequest')
@Controller({ host: ':version.api.localhost' })
export class ApiController {
  constructor(
    private apiService: ApiService,
  ) {}

  @Get()
  index(@HostParam('version') version: string): string {
    return `Hello, API ${version}`;
  }

  @Get('/pos_eos/barcode/:barcode')
  getPosBarcodeList(@Param('barcode') barcode: string) {
    return this.apiService.getPosBarcodeList(barcode);
  }

  @Get('/pos_eos/itemlist/:aspid/:slrid/:itemid')
    getPosItemList(
      @Param('aspid') aspid: number,
      @Param('slrid') slrid: number,
      @Param('itemid') itemid: number
    ) {
      return this.apiService.getPosItemList(aspid, slrid, itemid);
  }
  
  // Get test
  @Get('/pos_eos/test') 
    getTest(){
      // const url = `http://api.dsds.co.kr/jupiter/get_slrtd?auth_key=ZUJGNlV0NkxBS1ZDdU1jNHZqa2IrZz09&barcode=27909548856557`;
      const baseUrl = `http://api.dsds.co.kr/jupiter/get_slrtd`;
      // return this.apiService.getCommonAPI(url);
      return this.apiService.getTest(baseUrl);
  }


}

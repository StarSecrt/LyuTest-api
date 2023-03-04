import { Controller, Get, Inject, LoggerService, Param, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { AuthService } from 'src/common/auth/auth.service';
import { T_InterfaceItemEntity } from './entity/T_interface_item.entity';
import { InterfaceItemService } from './interface-item.service';

@Controller('interface/item')
export class InterfaceItemController {
    constructor(
        private interfaceItemService: InterfaceItemService,
        @Inject(Logger) private readonly Logger: LoggerService,
    ) {}

    @Get('/pos_eos/itemlistid/:aspid/:slrid/:itemid')
    getPosItemList(
      @Param('aspid') aspid: number,
      @Param('slrid') slrid: number,
      @Param('itemid') itemid: number
    ) {
        // return `test`;
      return this.interfaceItemService.getPosItemList(aspid, slrid, itemid);
    } 

    @Get('/pos_eos/bpitemlist/:bpcode')
    getPosItemList2(
      @Param('bpcode') bpcode: string
    ) {
        // return `test`;
      return this.interfaceItemService.getPosItemListBP(bpcode);
    } 


    // @UseGuards(AuthGuard)
    @Get('/list/:page')
    interfaceItemList(@Param('page') page: number): Promise<T_InterfaceItemEntity[]> {
        return this.interfaceItemService.interfaceItemList(page);
    }

    // @UseGuards(AuthGuard)
    @Get('/list2/:page')
    interfaceItemList_query(@Param('page') page: number): Promise<T_InterfaceItemEntity[]> {
        return this.interfaceItemService.interfaceItemList_query(page);
    }

    // @UseGuards(AuthGuard)
    @Get('/list3/:page')
    interfaceItemList_builder(@Param('page') page: number): Promise<T_InterfaceItemEntity[]> {
        return this.interfaceItemService.interfaceItemList_builder(page);
    }








    /* 거래처 호출 테스트 */
    @Get('/test')
    selectTestList(): Promise<any[]> {
        return this.interfaceItemService.selectTestList();
    }

    @Get('/test2')
    selectTestList2(): Promise<any[]> {
        return this.interfaceItemService.selectTestList2();
    }

    @Get('/test2/:bpcode')
    selectTestList3(@Param('bpcode') bpcode: string): Promise<object> {
        return this.interfaceItemService.selectTestFindOne(bpcode);
    }

}

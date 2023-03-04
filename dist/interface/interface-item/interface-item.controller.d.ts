import { LoggerService } from '@nestjs/common';
import { T_InterfaceItemEntity } from './entity/T_interface_item.entity';
import { InterfaceItemService } from './interface-item.service';
export declare class InterfaceItemController {
    private interfaceItemService;
    private readonly Logger;
    constructor(interfaceItemService: InterfaceItemService, Logger: LoggerService);
    getPosItemList(aspid: number, slrid: number, itemid: number): Promise<any>;
    getPosItemList2(bpcode: string): Promise<any>;
    interfaceItemList(page: number): Promise<T_InterfaceItemEntity[]>;
    interfaceItemList_query(page: number): Promise<T_InterfaceItemEntity[]>;
    interfaceItemList_builder(page: number): Promise<T_InterfaceItemEntity[]>;
    selectTestList(): Promise<any[]>;
    selectTestList2(): Promise<any[]>;
    selectTestList3(bpcode: string): Promise<object>;
}

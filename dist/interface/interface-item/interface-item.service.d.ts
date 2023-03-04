import { Logger } from '@nestjs/common';
import { T_BusinessPartnerEntity } from 'src/admin/bp/entity/T_business_partner.entity';
import { ApiService } from 'src/api/api.service';
import { DataSource, Repository } from 'typeorm';
import { T_InterfaceItemEntity } from './entity/T_interface_item.entity';
export declare class InterfaceItemService {
    private T_InterfaceItemRepository;
    private T_BusinessPartnerRepository;
    private dataSource;
    private apiService;
    private readonly logger;
    constructor(T_InterfaceItemRepository: Repository<T_InterfaceItemEntity>, T_BusinessPartnerRepository: Repository<T_BusinessPartnerEntity>, dataSource: DataSource, apiService: ApiService, logger: Logger);
    private PrintLoggerServiceLog;
    selectTestList(): Promise<T_BusinessPartnerEntity[]>;
    selectTestList2(): Promise<T_BusinessPartnerEntity[]>;
    selectTestFindOne(bpCode: string): Promise<object>;
    interfaceItemList(page: number): Promise<T_InterfaceItemEntity[]>;
    interfaceItemList_query(page: number): Promise<T_InterfaceItemEntity[]>;
    interfaceItemList_builder(page: number): Promise<T_InterfaceItemEntity[]>;
    getPosItemList(aspid: number, slrid: number, itemid: number): Promise<any>;
    getPosItemListBP(bpcode: string): Promise<any>;
    private savePosItem;
}

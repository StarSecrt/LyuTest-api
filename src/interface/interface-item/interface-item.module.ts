import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { T_BusinessPartnerEntity } from 'src/admin/bp/entity/T_business_partner.entity';
import { ApiModule } from 'src/api/api.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { T_InterfaceItemEntity } from './entity/T_interface_item.entity';
import { InterfaceItemController } from './interface-item.controller';
import { InterfaceItemService } from './interface-item.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([T_InterfaceItemEntity, T_BusinessPartnerEntity]),
        AuthModule,
        ApiModule,
    ],
    controllers: [InterfaceItemController],
    providers: [InterfaceItemService, Logger]
})
export class InterfaceItemModule {}

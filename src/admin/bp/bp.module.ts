import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { T_BusinessPartnerEntity } from './entity/T_business_partner.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([T_BusinessPartnerEntity]),
        AuthModule,
        ApiModule
    ]
})
export class AdminBpModule {}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const emailConfig_1 = require("./config/emailConfig");
const validationSchema_1 = require("./config/validationSchema");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const api_module_1 = require("./api/api.module");
const authConfig_1 = require("./config/authConfig");
const exception_module_1 = require("./common/exception/exception.module");
const logging_module_1 = require("./common/logging/logging.module");
const batch_module_1 = require("./batch/batch.module");
const terminus_1 = require("@nestjs/terminus");
const axios_1 = require("@nestjs/axios");
const health_check_controller_1 = require("./common/health-check/health-check.controller");
const bp_module_1 = require("./admin/bp/bp.module");
const item_module_1 = require("./admin/item/item.module");
const users_module_2 = require("./admin/users/users.module");
const interface_po_module_1 = require("./interface/interface-po/interface-po.module");
const interface_item_module_1 = require("./interface/interface-item/interface-item.module");
const interface_so_module_1 = require("./interface/interface-so/interface-so.module");
const system_module_1 = require("./admin/system/system.module");
const file_module_1 = require("./common/file/file.module");
const login_module_1 = require("./common/login/login.module");
const code_module_1 = require("./admin/code/code.module");
const auth_module_1 = require("./common/auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            exception_module_1.ExceptionModule,
            logging_module_1.LoggingModule,
            file_module_1.FileModule,
            login_module_1.LoginModule,
            code_module_1.CodeModule,
            auth_module_1.AuthModule,
            bp_module_1.AdminBpModule,
            item_module_1.AdminItemModule,
            users_module_2.AdminUsersModule,
            system_module_1.AdminSystemModule,
            interface_po_module_1.InterfacePoModule,
            interface_item_module_1.InterfaceItemModule,
            interface_so_module_1.InterfaceSoModule,
            api_module_1.ApiModule,
            batch_module_1.BatchModule,
            terminus_1.TerminusModule,
            axios_1.HttpModule,
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
                load: [emailConfig_1.default, authConfig_1.default],
                isGlobal: true,
                validationSchema: validationSchema_1.validationSchema,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: 5432,
                database: process.env.DATABASE_NAME,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                autoLoadEntities: true,
                migrations: [__dirname + '/**/migrations/*.js'],
                migrationsTableName: 'migrations',
                synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
            }),
        ],
        controllers: [app_controller_1.AppController, health_check_controller_1.HealthCheckController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
let TaskService = TaskService_1 = class TaskService {
    constructor() {
        this.Logger = new common_1.Logger(TaskService_1.name);
    }
    handleCron() {
        this.Logger.log('Task called by Cron');
    }
    handleInterval() {
        this.Logger.log('Task called by interval');
    }
    handleTimeout() {
        this.Logger.log('[Jupiter Labs]Orbit Service Start');
    }
};
__decorate([
    (0, schedule_1.Cron)('0 30 * * * *', { name: 'cronTask' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskService.prototype, "handleCron", null);
__decorate([
    (0, schedule_1.Interval)('intervalTask', 600000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskService.prototype, "handleInterval", null);
__decorate([
    (0, schedule_1.Timeout)('timeoutTask', 3000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskService.prototype, "handleTimeout", null);
TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)()
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map
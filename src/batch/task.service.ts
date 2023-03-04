import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { TIMEOUT } from 'dns';

@Injectable()
export class TaskService {
    private readonly Logger = new Logger(TaskService.name);

    @Cron('0 30 * * * *', { name: 'cronTask' })
    handleCron() {
        this.Logger.log('Task called by Cron');
    }

    @Interval('intervalTask', 600000)
    handleInterval() {
        this.Logger.log('Task called by interval');
    }

    @Timeout('timeoutTask', 3000)
    handleTimeout() {
        this.Logger.log('[Jupiter Labs]Orbit Service Start');
    }

}

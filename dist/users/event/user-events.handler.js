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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEventsHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const email_service_1 = require("../../common/email/email.service");
const test_event_1 = require("./test.event");
const user_created_event_1 = require("./user-created.event");
let UserEventsHandler = class UserEventsHandler {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async handle(event) {
        switch (event.name) {
            case user_created_event_1.UserCreatedEvent.name: {
                console.log('UserCreatedEvent!');
                const { email, signupVerifyToken } = event;
                await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
                break;
            }
            case test_event_1.TestEvent.name: {
                console.log('TestEvent!');
                break;
            }
            default:
                break;
        }
    }
};
UserEventsHandler = __decorate([
    (0, cqrs_1.EventsHandler)(user_created_event_1.UserCreatedEvent, test_event_1.TestEvent),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], UserEventsHandler);
exports.UserEventsHandler = UserEventsHandler;
//# sourceMappingURL=user-events.handler.js.map
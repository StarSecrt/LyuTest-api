"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedEvent = void 0;
const cqrs_event_1 = require("./cqrs-event");
class UserCreatedEvent extends cqrs_event_1.CqrsEvent {
    constructor(email, signupVerifyToken) {
        super(UserCreatedEvent.name);
        this.email = email;
        this.signupVerifyToken = signupVerifyToken;
    }
}
exports.UserCreatedEvent = UserCreatedEvent;
//# sourceMappingURL=user-created.event.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEvent = void 0;
const cqrs_event_1 = require("./cqrs-event");
class TestEvent extends cqrs_event_1.CqrsEvent {
    constructor() {
        super(TestEvent.name);
    }
}
exports.TestEvent = TestEvent;
//# sourceMappingURL=test.event.js.map
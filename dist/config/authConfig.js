"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('auth', () => ({
    jwtIssuer: process.env.JWT_ISSUER,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessTime: process.env.JWT_ACCESS_EXPIRESIN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshTime: process.env.JWT_REFRESH_EXPIRESIN
}));
//# sourceMappingURL=authConfig.js.map
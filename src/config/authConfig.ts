import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  jwtIssuer: process.env.JWT_ISSUER,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessTime: process.env.JWT_ACCESS_EXPIRESIN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshTime: process.env.JWT_REFRESH_EXPIRESIN
  }
));
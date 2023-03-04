import authConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';
interface User {
    index: number;
    id: string;
    name: string;
    email: string;
}
export declare class AuthService {
    private config;
    constructor(config: ConfigType<typeof authConfig>);
    loginCreateAccessToken(user: User): string;
    loginCreateRefreshToken(user: User): string;
    createToken(payload: any, secretKey: string, tokenTime: string): string;
    verify(jwtString: string): {
        userId: string;
        email: string;
    };
    refreshVerify(jwtString: string): {
        userId: string;
        email: string;
    };
}
export {};

import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import authConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';

interface User {
  index: number;
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) { }

  // login(user: User) {
  //   const payload = { ...user };
  //   const accessSecret = this.config.jwtAccessSecret;
  //   const accessTokenTime = this.config.jwtAccessTime;

  //   const CreateAccessToken = this.createToken(payload, accessSecret, accessTokenTime);

  //   return CreateAccessToken;
  // }

  loginCreateAccessToken(user: User) {
    const payload = { ...user };
    const accessSecret = this.config.jwtAccessSecret;
    const accessTokenTime = this.config.jwtAccessTime;

    return this.createToken(payload, accessSecret, accessTokenTime);
  }

  loginCreateRefreshToken(user: User) {
    const payload = { ...user };
    const refreshSecret = this.config.jwtRefreshSecret;
    const refreshTokenTime = this.config.jwtRefreshTime;

    return this.createToken(payload, refreshSecret, refreshTokenTime);
  }

  createToken(payload: any, secretKey: string, tokenTime: string) {
    return jwt.sign(
        {
          index: payload.index,
          name: payload.name,
          email: payload.email
        },
        secretKey,
        {
          algorithm: 'HS512',
          expiresIn: tokenTime,
          issuer: this.config.jwtIssuer
        }      
      );
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.config.jwtAccessSecret) as (jwt.JwtPayload | string) & User;

      const { id, email } = payload;

      return {
        userId: id,
        email,
      }
    } catch (e) {
      throw new UnauthorizedException('승인에 실패하였습니다.')
    }
  }

  refreshVerify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.config.jwtRefreshSecret) as (jwt.JwtPayload | string) & User;
  
      const { id, email } = payload;
  
      return {
        userId: id,
        email,
      }
    } catch (e) {
      throw new UnauthorizedException('Refresh Token 승인에 실패하였습니다.')
    }
  }
}




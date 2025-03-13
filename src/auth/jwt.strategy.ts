import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      secretOrKey: 'Secret333', // JWT 시크릿 키
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰 추출
    });
  }

  async validate(payload: { email: string, sub: number }) {
    const user = await this.usersService.getUserByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // Passport가 req.user에 유저 정보 저장
  }
}

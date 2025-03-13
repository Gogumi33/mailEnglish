import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // JWT 서비스 주입
  ) {}

  // 로그인 로직
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.getUserByEmail(email);

    if (user && (await this.usersService.validatePassword(password, user.password))) {
      // 🌟 유저 토큰 생성 (JWT)
      const payload = { email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패! 이메일 또는 비밀번호를 확인하세요.');
    }
  }
}

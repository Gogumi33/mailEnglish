import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // 회원 가입
  async createUser(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10); // 솔트 : 임의의 값
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword, // 🌟 해싱된 비밀번호 저장
        nickname: data.nickname,
      },
    });
  }

  // ✅ 비밀번호 검증 (로그인 시 사용)
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // ✅ 이메일로 사용자 조회 (Auth 모듈에서 사용)
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // 모든 유저 조회
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // 특정 유저 조회
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // 유저 삭제
  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // 회원 가입
  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // 👉 나중에 해싱 필요 (bcrypt 적용)
        nickname: data.nickname,
      },
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

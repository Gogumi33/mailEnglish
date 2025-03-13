import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaClient를 상속해서 NestJS에서 Prisma를 사용할 수 있도록 함
// onModuleInit() → 애플리케이션 시작 시 DB 연결
// onModuleDestroy() → 애플리케이션 종료 시 DB 연결 해제
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

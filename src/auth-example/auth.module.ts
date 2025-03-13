import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ User 엔티티 등록
  controllers: [AuthController],
  providers: [AuthService], // ✅ 서비스 등록
  exports: [AuthService], // ✅ 필요한 곳에서 AuthService 사용 가능하게 설정
})
export class AuthModule {}
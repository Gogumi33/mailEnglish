import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SentencesModule } from './sentences/sentences.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { SettingsModule } from './settings/settings.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, SentencesModule, BookmarksModule, SettingsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

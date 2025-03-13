import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth-example/auth.module';
import { UsersModule } from './users/users.module';
import { SentencesModule } from './sentences/sentences.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [AuthModule, UsersModule, SentencesModule, BookmarksModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

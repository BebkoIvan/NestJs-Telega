import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { usersProviders } from './app.providers';
import { UsersModule } from './users/users.module';
import { BotService } from './bot/bot/bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { SitcomsModule } from './sitcoms/sitcoms.module';

@Module({
  imports: [DatabaseModule, UsersModule,
    TelegrafModule.forRoot({
    token: '1127723532:AAHk3E4yROZUi49jkH6mU05oFE4sO9kf36k'
  }),
    SitcomsModule
],
  controllers: [AppController],
  providers: [AppService, BotService, ...usersProviders],
})
export class AppModule {}

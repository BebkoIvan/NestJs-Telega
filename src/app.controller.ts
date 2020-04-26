import { Controller, Get, Body, Logger, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices/decorators';
import { Episode } from './shared/models/Episode.model';
import { BotService } from './bot/bot/bot.service';
import { UsersService } from './users/users/users.service';


@Controller()
export class AppController {
  constructor(private userS: UsersService, private botService: BotService) {}

  @MessagePattern('episodePublished')
  async sendNotifications(episode: Episode) {
    // return this.userS.sendNotifications(episode);
  }
}

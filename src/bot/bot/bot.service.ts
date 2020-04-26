import { Injectable, Logger } from '@nestjs/common';
import { TelegrafStart, ContextMessageUpdate, TelegrafHelp, TelegrafOn, TelegrafHears, TelegrafAction, TelegrafCommand, TelegrafUse } from 'nestjs-telegraf';
import { SitcomsService } from 'src/sitcoms/sitcoms.service';
import { Sitcom } from 'src/sitcoms/models/sitcom.model';
import { UsersService } from 'src/users/users/users.service';
const Keyboard = require('telegraf-keyboard');

const inlineKeyboardOptions = {
  inline: true,
  duplicates: false,
  newline: false,
};

@Injectable()
  export class BotService {

    constructor(private sitcomS: SitcomsService, private userS: UsersService) {}

    @TelegrafStart()
    async start(ctx: ContextMessageUpdate) {
      const welcomeMsg = `Hello my dear friend!
      This bot will help you to subscribe to your favorite sitcoms!
      Please press 'See all'`
      const options = {
        inline: false,
        duplicates: false, 
        newline: false, 
      };
      const keyboard = new Keyboard(options);
      keyboard
      .add('🤘 See All', '✅ My Subscriptions')
      .add('🔍 Search', '😎 Popular');

      await this.userS.addUser({
        name: ctx.message.from.first_name,
        telegramId: ctx.message.from.id
      });

      ctx.reply(welcomeMsg, keyboard.draw());
    }
   
    @TelegrafHelp()
    help(ctx: ContextMessageUpdate) {
      ctx.reply('Send me a sticker');
    }
   
    @TelegrafOn('sticker')
    async on(ctx: ContextMessageUpdate) {
      ctx.reply('👍');
    }

    @TelegrafAction(/\b(\w*subscribe to\w*)\b/)
    async addSubscription(ctx: ContextMessageUpdate) {
      const sitcomId = ctx.callbackQuery.data.split(' ').splice(-1)[0];
      await this.userS.addSubscription(ctx.from.id, sitcomId);
      ctx.editMessageReplyMarkup({inline_keyboard: [
        [
          {
            text: '🔕 Unsubscribe',
            callback_data: `unsubscribe from ${sitcomId}`
          }
        ]
      ]});
    }

    @TelegrafAction(/\b(\w*unsubscribe from\w*)\b/)
    async removeSubscription(ctx: ContextMessageUpdate) {
      const sitcomId = ctx.callbackQuery.data.split(' ').splice(-1)[0];
      await this.userS.removeSubscription(ctx.from.id, sitcomId);
      ctx.editMessageReplyMarkup({inline_keyboard: [
        [
          {
            text: '🔔 Subscribe',
            callback_data: `subscribe to ${sitcomId}`
          }
        ]
      ]});
    }

    @TelegrafHears('✅ My Subscriptions')
    async showSubscriptions(ctx: ContextMessageUpdate) {
      const user = await this.userS.getOneByTelegaId(ctx.from.id);
      if (user.subscriptions.length) {
        user.subscriptions.forEach(el => {
          const keyboard = new Keyboard(inlineKeyboardOptions);
          keyboard.add(`🔕 Unsubscribe:unsubscribe from ${el._id}`);
          ctx.reply(el.name, keyboard.draw());
        })
      }
      else ctx.reply('Currently you do not have any active subscriptions(');
    }
   
    @TelegrafHears('🤘 See All')
    async showAll(ctx: ContextMessageUpdate) {
      const sitcoms: Sitcom[] = await this.sitcomS.getAll();
      const userSubscriptions = (await this.userS.getOneByTelegaId(ctx.from.id)).subscriptions;
      sitcoms.forEach(el => {
        const keyboard = new Keyboard(inlineKeyboardOptions);
        if (userSubscriptions.find(sub => sub.id === el.id )) keyboard.add(`🔕 Unsubscribe:unsubscribe from ${el._id}`);
        else keyboard.add(`🔔 Subscribe:subscribe to ${el.id}`);
        ctx.reply(el.name, keyboard.draw());
      })
    }
}

import { Injectable, Inject, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserFull } from '../models/user.model';
import { Episode } from 'src/shared/models/Episode.model';

@Injectable()
export class UsersService {

  constructor(@Inject('USER_MODEL')
  private userModel: Model<User>) {}

  // async sendNotifications(episode: Episode) {
  //   const subscribers = await this.userModel.find({subscriptions: episode.id});
  //   Logger.log(subscribers);
  //   return 1;
  // }

  async getAll() {
    return await this.userModel.find();
  }

  async addSubscription(telegramId, subscr): Promise<any> {
    return await this.userModel.findOneAndUpdate({telegramId}, {$push: { subscriptions: subscr}});
  }

  async removeSubscription(telegramId, subscr): Promise<any> {
    return await this.userModel.findOneAndUpdate({telegramId}, {$pull: { subscriptions: subscr}});
  }

  async getOneByTelegaId(telegramId): Promise<UserFull> {
    return await this.userModel.findOne({telegramId}).populate('subscriptions', 'name');
  }

  async addUser(user) {
    return await this.userModel.findOneAndUpdate({telegramId: user.telegramId}, {...user}, {upsert: true});
  }
  
}

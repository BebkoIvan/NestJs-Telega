import { Injectable, Inject, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './users/models/user.model';
import { Episode } from './shared/models/Episode.model';


@Injectable()
export class AppService {

  constructor(@Inject('USER_MODEL')
  private userModel: Model<User>) {}
  
}

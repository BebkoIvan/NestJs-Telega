import { Document } from 'mongoose';
import { Sitcom } from 'src/sitcoms/models/sitcom.model';

export interface User extends Document {
  readonly telegramId: number,
  readonly name: string;
  readonly subscriptions: Array<Sitcom>;
}

export interface UserFull {
  _id: string;
  telegramId: number,
  name: string;
  subscriptions: Array<Sitcom>;
}
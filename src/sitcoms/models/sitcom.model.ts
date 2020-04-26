import { Document } from 'mongoose';

export interface Sitcom extends Document {
  readonly id: string;
  readonly name: string;
}
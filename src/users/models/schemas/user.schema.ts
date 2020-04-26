import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
  telegramId: Number,
  name: String,
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sitcom' 
  }]
});

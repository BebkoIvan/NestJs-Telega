import { Injectable, Inject } from '@nestjs/common';
import { Sitcom } from './models/sitcom.model';
import { Model } from 'mongoose';

@Injectable()
export class SitcomsService {
  constructor(@Inject('SITCOM_MODEL')
  private sitcomModel: Model<Sitcom>) {}

  async addSitcom(name: string) {
    const sitcom = new this.sitcomModel({name});
    return await sitcom.save();
  }

  getAll() {
    return this.sitcomModel.find();
  }

}

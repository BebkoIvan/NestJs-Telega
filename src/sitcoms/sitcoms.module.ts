import { Module } from '@nestjs/common';
import { SitcomsService } from './sitcoms.service';
import { DatabaseModule } from 'src/database/database.module';
import { Connection } from 'mongoose';
import { SitcomSchema } from './models/schemas/sitcom.schema';

export const sitcomsProviders = [
  {
    provide: 'SITCOM_MODEL',
    useFactory: (connection: Connection) => connection.model('Sitcom', SitcomSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [SitcomsService, ...sitcomsProviders],
  exports: [SitcomsService]
})
export class SitcomsModule {}



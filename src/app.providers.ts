import { Connection } from 'mongoose';
import { UserSchema } from './users/models/schemas/user.schema';
import { SitcomSchema } from './sitcoms/models/schemas/sitcom.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const sitcomsProviders = [
  {
    provide: 'SITCOM_MODEL',
    useFactory: (connection: Connection) => connection.model('Sitcom', SitcomSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
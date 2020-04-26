import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Connection } from 'mongoose';
import { UserSchema } from './models/schemas/user.schema';
import { DatabaseModule } from 'src/database/database.module';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule {}

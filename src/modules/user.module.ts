import { Module } from '@nestjs/common';

import { UserService } from 'src/services/user.service';
import { userProviders } from 'src/providers/user.provider';

@Module({
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
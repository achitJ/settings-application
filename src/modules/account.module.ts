import { Module } from '@nestjs/common';
import { AccountController } from 'src/controllers/account.controller';
import { accountProvider } from 'src/providers/account.provider';
import { AccountService } from 'src/services/account.service';


@Module({
  providers: [AccountService, ...accountProvider],
  controllers: [AccountController],
})
export class AccountModule {}
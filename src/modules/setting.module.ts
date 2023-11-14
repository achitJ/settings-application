import { Module } from '@nestjs/common';
import { SettingController } from 'src/controllers/setting.controller';
import { accountProvider } from 'src/providers/account.provider';
import { settingProvider } from 'src/providers/setting.provider';
import { AccountService } from 'src/services/account.service';
import { SettingService } from 'src/services/setting.service';


@Module({
  providers: [
    SettingService, 
    AccountService, 
    ...settingProvider,
    ...accountProvider
  ],
  controllers: [SettingController],
})
export class SettingModule {}
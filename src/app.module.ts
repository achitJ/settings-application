import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AccountModule } from './modules/account.module';
import { SettingModule } from './modules/setting.module';

@Module({
  imports: [DatabaseModule, AccountModule, SettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { Setting } from 'src/entities/setting.entity';
import { SETTING_REPOSITORY } from 'src/core/constants';
import { CreateSettingDto } from 'src/dto/create-setting.dto';
import { UpdateSettingDto } from 'src/dto/update-setting.dto';
import { matchDataType } from 'src/core/validators/settings.validator';
import { DeleteSettingDto } from 'src/dto/delete-setting.dto';

@Injectable()
export class SettingService {
    constructor(@Inject(SETTING_REPOSITORY) private readonly settingRepository: typeof Setting) { }

    async create(setting: CreateSettingDto): Promise<Setting> {
        if(!matchDataType(setting.data_type, setting.value)) {
            throw new BadRequestException('The data type of the value doesn\'t match the data_type of the setting');
        }

        return await this.settingRepository.create<Setting>({ ...setting });
    }

    async findAll(): Promise<Setting[]> {
        return await this.settingRepository.findAll<Setting>();
    }

    async findAllByAccount(account_id: number): Promise<Setting[]> {
        return await this.settingRepository.findAll<Setting>({ where: { account_id } });
    }

    async findOneByAccountAndName(account_id: number, name: string): Promise<Setting> {
        return await this.settingRepository.findOne<Setting>({ where: { account_id, name } });
    }

    async updateOneByAccountAndName({ account_id, name, value }: UpdateSettingDto): Promise<Setting> {
        const setting = await this.findOneByAccountAndName(account_id, name);

        if(!matchDataType(setting.data_type, value)) {
            throw new BadRequestException('The data type of the value doesn\'t match the data_type of the setting');
        }

        setting.value = value.toString();

        return await setting.save();
    }

    async deleteOneByAccountAndName({ account_id, name }: DeleteSettingDto): Promise<Setting> {
        const setting = await this.findOneByAccountAndName(account_id, name);

        await setting.destroy();

        return setting;
    }
};

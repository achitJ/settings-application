import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';

import { Setting as SettingEntity } from '../entities/setting.entity';
import { SettingService } from 'src/services/setting.service';
import { CreateSettingDto } from 'src/dto/create-setting.dto';
import { DoesAccountIdExist } from 'src/core/gaurds/doesAccountExist.gaurd';
import { CanSettingBeDeleted, DoesSettingNameExist } from 'src/core/gaurds/doesSettingExist.gaurd';
import { UpdateSettingDto } from 'src/dto/update-setting.dto';
import { DeleteSettingDto } from 'src/dto/delete-setting.dto';

@Controller('setting')
export class SettingController {
    constructor(private readonly settingService: SettingService) { }

    @Get()
    async findAll(): Promise<SettingEntity[]> {
        return await this.settingService.findAll();
    }

    @UseGuards(DoesAccountIdExist)
    @Get(':account_id')
    async findOneByAccount(@Param('account_id') account_id: number): Promise<SettingEntity[]> {
        return await this.settingService.findAllByAccount(account_id);
    }

    @UseGuards(DoesAccountIdExist, DoesSettingNameExist)
    @Post()
    async create(@Body() setting: CreateSettingDto, @Request() req): Promise<SettingEntity> {
        return await this.settingService.create(setting);
    }

    @UseGuards(DoesAccountIdExist)
    @Patch()
    async updateOneByAccountAndName(@Body() setting: UpdateSettingDto, @Request() req): Promise<SettingEntity> {
        return await this.settingService.updateOneByAccountAndName(setting);
    }

    @UseGuards(DoesAccountIdExist, CanSettingBeDeleted)
    @Delete()
    async deleteOneByAccountAndName(@Body() setting: DeleteSettingDto, @Request() req): Promise<SettingEntity> {
        return await this.settingService.deleteOneByAccountAndName(setting);
    }
}
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { Account as AccountEntity } from '../entities/account.entity';
import { AccountService } from 'src/services/account.service';
import { CreateAccountDto } from 'src/dto/create-account.dto';
import { DoesAccountNameExist } from 'src/core/gaurds/doesAccountExist.gaurd';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Get()
    async findAll(): Promise<AccountEntity[]> {
        return await this.accountService.findAll();
    }

    @UseGuards(DoesAccountNameExist)
    @Post()
    async create(@Body() account: CreateAccountDto): Promise<AccountEntity> {
        return await this.accountService.create(account);
    }
}
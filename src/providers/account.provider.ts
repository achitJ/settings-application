import { Account } from 'src/entities/account.entity';
import { ACCOUNT_REPOSITORY } from 'src/core/constants';

export const accountProvider = [
    {
        provide: ACCOUNT_REPOSITORY,
        useValue: Account,
    },
];
import { User } from 'src/entities/user.entity';
import { USER_REPOSITORY } from 'src/core/constants';

export const userProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: User,
    },
];
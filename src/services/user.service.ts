import { Injectable, Inject } from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: CreateUserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { username } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}
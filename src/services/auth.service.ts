import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser({ username, password }: LoginUserDto) {
        const user = await this.userService.findOneByUsername(username);

        if (!user) {
            return null;
        }

        const match = await this.comparePassword(password, user.password);

        if (!match) {
            return null;
        }

        const result = user['dataValues'];
        delete result.password;
        
        return result;
    }

    public async login(user: LoginUserDto) {
        const token = await this.generateToken(user);
        return { user, token };
    }

    public async create(user: CreateUserDto) {
        const pass = await this.hashPassword(user.password);
        const newUser = await this.userService.create({ ...user, password: pass });
        const { password, ...result } = newUser['dataValues'];
        const token = await this.generateToken(result);

        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user, {
            expiresIn: process.env.TOKEN_EXPIRATION,
            secret: process.env.JWTKEY,
        });
        return token;
    }

    private async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsNumber } from 'class-validator';

export class LoginUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}
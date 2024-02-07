import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsNumber } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsNumber()
    readonly account_id: number;
}
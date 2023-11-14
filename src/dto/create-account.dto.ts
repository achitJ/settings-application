import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateAccountDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
}
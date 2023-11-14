import { IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';

export class FindByNameDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
}

export class FindByIdDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
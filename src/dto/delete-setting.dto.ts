import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';

export class DeleteSettingDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    account_id: number;
}
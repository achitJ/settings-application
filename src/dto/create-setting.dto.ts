import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { IsType } from 'src/core/validators/settings.validator';

export class CreateSettingDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['string', 'number', 'boolean'])
    data_type: string;

    @IsNotEmpty()
    @IsType(["string", "number", "boolean"])
    value: string | number | boolean;

    @IsNotEmpty()
    @IsNumber()
    account_id: number;
}
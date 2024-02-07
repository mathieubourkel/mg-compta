import { IsDateString, IsInt, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PriceDto } from "./price.dto";

export class UpdateComptaDto  {
    @IsOptional()
    @IsString()
    @Length(1, 150)
    description:string;
    @ValidateNested()
    @Type(() => PriceDto)
    price:PriceDto
    @IsOptional()
    @IsInt()
    status:number;
    @IsOptional()
    @IsDateString()
    commandDate:Date;
    @IsOptional()
    @IsDateString()
    deliveryDate:Date;
}
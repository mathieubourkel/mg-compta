import { IsDateString, IsInt, IsOptional, IsString, Length, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class PriceDto {
    @IsOptional()
    @IsInt()
    fullTaxPrice: number
    @IsOptional()
    @IsInt()
    preTaxPrice: number
    @IsInt()
    @Max(20)
    devise: number
}

export class CreateComptaDto {
    @IsInt()
    @Max(3)
    refModel:number
    @IsString()
    refId:string;
    @IsString()
    @Length(1, 150)
    description:string;
    @ValidateNested()
    @Type(() => PriceDto)
    price:PriceDto
    @IsInt()
    @Max(3)
    status:number;
    @IsDateString()
    commandDate:Date;
    @IsDateString()
    deliveryDate:Date;
}

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



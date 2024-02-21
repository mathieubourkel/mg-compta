import { IsDateString, IsInt, IsString, Length, Max, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PriceDto } from "./price.dto";

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
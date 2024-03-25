import { IsDateString, IsInt, IsString, Length, Max, } from "class-validator";
import { PriceDto } from "./price.dto";

export class CreateComptaDto {
    @IsInt()
    @Max(3)
    refModel:number
    @IsString()
    refId:string;
    @IsString()
    @Length(5, 150)
    description:string;
    @IsInt()
    price:PriceDto
    @IsInt()
    @Max(3)
    status:number;
    @IsDateString()
    commandDate:Date;
    @IsDateString()
    deliveryDate:Date;
}
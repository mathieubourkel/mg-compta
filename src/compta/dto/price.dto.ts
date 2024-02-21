import { IsInt, IsOptional, Max } from "class-validator";

export class PriceDto {
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







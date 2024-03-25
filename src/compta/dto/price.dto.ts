import { IsInt, IsOptional, Max } from "class-validator";

export class PriceDto {
    @IsOptional()
    @IsInt()
    fulltaxPrice: number
    @IsOptional()
    @IsInt()
    pretaxPrice: number
    @IsInt()
    @Max(20)
    devise: number
}







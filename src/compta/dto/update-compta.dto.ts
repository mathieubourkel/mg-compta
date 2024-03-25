import { IsDateString, IsInt, IsOptional, IsString, Length, ValidateNested } from "class-validator";

export class UpdateComptaDto  {
    @IsOptional()
    @IsString()
    @Length(1, 150)
    description:string;
    @IsOptional()
    @IsInt()
    price:number
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
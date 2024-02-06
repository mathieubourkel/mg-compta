import { IsDateString, IsInt, IsString, Length, Max, Min } from "class-validator";

export class ComptaDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsString()
    ref:string;
    @IsInt()
    @Max(3)
    status:number;
    @IsInt()
    price:number;
    @IsDateString()
    commandDate:Date;
    @IsDateString()
    deliveryDate:Date;
}

export class CreateComptaDto extends ComptaDto {
    // @IsInt()
    // @Min(1)
    // project: number;
}


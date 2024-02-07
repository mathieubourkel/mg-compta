import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Next, NotFoundException, Param, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { ComptaService } from './compta.service';
import { CreateComptaDto, UpdateComptaDto } from './dto/compta.dto';
import { Observable, of } from 'rxjs';
import { ModelEnum } from './enums/model.enum';
import { Compta } from './schemas/compta.schema';

@Controller('compta')
export class ComptaController {

    constructor(private readonly comptaService: ComptaService) {}

    @Get(`:refModel/:refId`)
    async getPurchasesByIdRefModel(@Param() params:{refModel: string, refId: string}):Promise<Compta[]>{
        try {
            const result = await this.comptaService.getPurchasesByRef(ModelEnum[`${params.refModel}`], params.refId)
            if (!result) throw new NotFoundException()
            return result;
        } catch (error) {
            throw new BadRequestException()
        }
  }

    @Post()
    create(
        @Body(new ValidationPipe()) createCompta:CreateComptaDto) {
            try {
                return this.comptaService.create(createCompta)
            } catch (error) {
                throw new InternalServerErrorException()
            }
        }

    @Put(':id')
    update(@Param('id') id:string, @Body(new ValidationPipe()) compta:UpdateComptaDto):Observable<{}>{
        try {
            return of (this.comptaService.update<Compta>(id, compta))
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @Delete(':id')
    delete(@Param('id') id:string):Observable<{}>{
        try {
            return of (this.comptaService.delete(id))
        } catch (error) {
            throw new BadRequestException()
        }
    }
}
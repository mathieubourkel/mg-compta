import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Next, NotFoundException, Param, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { ComptaService } from './compta.service';
import { Observable, of } from 'rxjs';
import { ModelEnum } from './enums/model.enum';
import { Compta } from './schemas/compta.schema';
import { CreateComptaDto } from './dto/create-compta.dto';
import { UpdateComptaDto } from './dto/update-compta.dto';
import { BaseUtils } from 'libs/base/base.utils';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('compta')
export class ComptaController extends BaseUtils {

    constructor(
        private readonly comptaService: ComptaService) {
            super()
        }

    @MessagePattern('TEST2')
    async getCu(@Payload() data: any) {
        console.log(data)
        return "coucou from nats"
    }

    @MessagePattern('TEST')
    async getPurchasesByIdRefModel(@Payload() data: any):Promise<Compta[]>{
        try {
            const result = await this.comptaService.getPurchasesByRef(ModelEnum[`${data.refModel}`], data.refId)
            if (!result) this._Ex("NOT-FIND", 400, "CC-22", "GET /compta/:refM/:refId")
            return result;
        } catch (error) {
            this._catchEx(error)
        }
  }

    @Post()
    create(
        @Body(new ValidationPipe()) createCompta:CreateComptaDto) {
            try {
                return this.comptaService.create(createCompta)
            } catch (error) {
                this._catchEx(error)
            }
        }

    @Put(':id')
    update(@Param('id') id:string, @Body(new ValidationPipe()) compta:UpdateComptaDto):Observable<{}>{
        try {
            return of (this.comptaService.update<Compta>(id, compta))
        } catch (error) {
            this._catchEx(error)
        }
    }

    @Delete(':id')
    delete(@Param('id') id:string):Observable<{}>{
        try {
            return of (this.comptaService.delete(id))
        } catch (error) {
            this._catchEx(error)
        }
    }
}
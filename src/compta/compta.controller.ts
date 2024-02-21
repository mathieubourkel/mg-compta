import {  Controller, ValidationPipe } from '@nestjs/common';
import { ComptaService } from './compta.service';
import { ModelEnum } from './enums/model.enum';
import { Compta } from './schemas/compta.schema';
import { CreateComptaDto } from './dto/create-compta.dto';
import { UpdateComptaDto } from './dto/update-compta.dto';
import { BaseUtils } from 'libs/base/base.utils';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ComptaController extends BaseUtils {

    constructor(private readonly comptaService: ComptaService) {
        super()
    }

    @MessagePattern('GET_COMPTAS')
    async getPurchasesByIdRefModel(@Payload() params: {refModel:keyof typeof ModelEnum, refId:string}):Promise<Compta[]>{
        try {
            const result = await this.comptaService.getPurchasesByRef(ModelEnum[`${params.refModel}`], params.refId)
            if (!result) this._Ex("BAD REQUEST", 400, "MS-COMPTA-CTRL-GET-PRCH")
            return result;
        } catch (error) {
            this._Ex("GET-COMPTA-FAILED", 400, error.message)
        }
    }

    @MessagePattern('POST_COMPTA')
    async create(@Payload(new ValidationPipe()) createCompta:CreateComptaDto):Promise<Compta>{
        try {
            return await this.comptaService.create(createCompta)
        } catch (error) {
            console.log(error)
            this._Ex("CREATE-COMPTA-FAILED", 400, error.message)
        }
    }

    @MessagePattern('PUT_COMPTA')
    async update(@Payload('body', new ValidationPipe()) body:UpdateComptaDto, @Payload('id') id:string):Promise<Compta>{
        try {
           return await this.comptaService.update<Compta>(id, body)
        } catch (error) {
            this._Ex("UPDATE-COMPTA-FAILED", 400, error.message)
        }
    }

    @MessagePattern('DELETE_COMPTA')
    async delete(@Payload() _id:string){
        try {
            return await this.comptaService.delete(_id)
        } catch (error) {
            this._Ex("DELETE-COMPTA-FAILED", 400, error.message)
        }
    }
}
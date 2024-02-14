import {  Controller, ValidationPipe } from '@nestjs/common';
import { ComptaService } from './compta.service';
import { ModelEnum } from './enums/model.enum';
import { Compta } from './schemas/compta.schema';
import { CreateComptaDto } from './dto/create-compta.dto';
import { UpdateComptaDto } from './dto/update-compta.dto';
import { BaseUtils } from 'libs/base/base.utils';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from 'src/app.service';

@Controller()
export class ComptaController extends BaseUtils {

    constructor(
        private readonly comptaService: ComptaService,
        private readonly appService: AppService) {
            super()
        }

    @MessagePattern('GET_COMPTAS')
    async getPurchasesByIdRefModel(@Payload() data: any):Promise<Compta[]>{
        try {
            const result = await this.comptaService.getPurchasesByRef(ModelEnum[`${data.refModel}`], data.refId)
            if (!result) this._Ex("NOT-FIND", 400, "CC-22", "GET /compta/:refM/:refId")
            return result;
        } catch (error) {
            return error
        }
    }

    @MessagePattern('POST_COMPTA')
    async create(@Payload(new ValidationPipe()) createCompta:CreateComptaDto):Promise<Compta>{
        try {
            const result = await this.comptaService.create(createCompta)
            this.appService.client.emit("ADD_LOG", result)
            this.appService.client.emit("SEND_MAIL", result)
            return result;
        } catch (error) {
            console.log("coucou", error)
            throw error
        }
    }

    @MessagePattern('PUT_COMPTA')
    async update(@Payload("body", new ValidationPipe()) body:UpdateComptaDto, @Payload('id') id:string){
        return await this.comptaService.update<Compta>(id, body)
    }

    @MessagePattern('DELETE_COMPTA')
    async delete(@Payload() id:string){
        try {
            return await this.comptaService.delete(id)
        } catch (error) {
            this._catchEx(error)
        }
    }
}
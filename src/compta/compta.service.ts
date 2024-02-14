import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Compta } from './schemas/compta.schema';
import { CreateComptaDto } from './dto/create-compta.dto';
import { UpdateComptaDto } from './dto/update-compta.dto';
import { BaseUtils } from 'libs/base/base.utils';

@Injectable()
export class ComptaService extends BaseUtils {

    constructor(@InjectModel(Compta.name) private comptaModel: Model<Compta>) {
        super()
    }

    async getAll(): Promise<Compta[]> {
        try {
            return await this.comptaModel.find()
        } catch (error) {
            this._catchEx(error)
        }
      }

      async getPurchasesByRef(refModel: number, refId: string): Promise<Compta[]> {
        try {
            return await this.comptaModel.find({refModel, refId})
        } catch (error) {
            this._catchEx(error)
        }
      }
    
      async getOneById(_id: string): Promise<Compta> {
        try {
            return await this.comptaModel.findById(_id).exec()
        } catch (error) {
            this._catchEx(error)
        }
      }
    
      async create(createComptaDto: CreateComptaDto): Promise<Compta> {
        try {
            return await this.comptaModel.create(createComptaDto)
        } catch (error) {
            this._catchEx(error)
        } 
      }

      async update<Compta>(_id: string, comptaDto:UpdateComptaDto): Promise<Compta> {
        try {
            return await this.comptaModel.findByIdAndUpdate<Compta>(_id, comptaDto, {new: true});
        } catch (error) {
            this._catchEx(error)
        }
      }
    
      async delete(_id: string) {
        try {
            return await this.comptaModel.deleteOne({_id})
        } catch (error) {
            this._catchEx(error)
        }
      }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Compta } from './schemas/compta.schema';
import { CreateComptaDto } from './dto/create-compta.dto';
import { UpdateComptaDto } from './dto/update-compta.dto';

@Injectable()
export class ComptaService {

    constructor(@InjectModel(Compta.name) private comptaModel: Model<Compta>) {}

    async getAll(): Promise<Compta[]> {
        try {
            return await this.comptaModel.find()
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }

      async getPurchasesByRef(refModel: number, refId: string): Promise<Compta[]> {
        try {
            return await this.comptaModel.find({refModel, refId})
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }
    
      async getOneById(_id: string): Promise<Compta> {
        try {
            return await this.comptaModel.findById(_id).exec()
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }
    
      async create(createComptaDto: CreateComptaDto): Promise<Compta> {
        try {
            return await this.comptaModel.create(createComptaDto)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        } 
      }

      async update<Compta>(_id: string, comptaDto:UpdateComptaDto): Promise<Compta> {
        try {
            return await this.comptaModel.findByIdAndUpdate(_id, comptaDto, {new: true});
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
          
      }
    
      async delete(_id: string) {
        try {
            return await this.comptaModel.deleteOne({_id})
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }
}

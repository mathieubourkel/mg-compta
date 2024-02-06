import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Compta } from './schemas/compta.schema';
import { ComptaDto, CreateComptaDto } from './dto/compta.dto';
import { nextTick } from 'process';

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
    
      async getOneById(id: string): Promise<Compta> {
        try {
            return await this.comptaModel.findById(id).exec()
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

      async update(id: number, comptaDto:ComptaDto): Promise<Compta> {
        try {
            return await this.comptaModel.findOneAndUpdate({ id }, comptaDto);
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

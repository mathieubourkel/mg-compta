import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Compta, ComptaSchema } from './schemas/compta.schema';
import { ComptaController } from './compta.controller';
import { ComptaService } from './compta.service';
import { ClientProxy } from '@nestjs/microservices';

@Module({
  imports:[MongooseModule.forFeature([
    {name: Compta.name, schema: ComptaSchema},
  ])],
  controllers: [ComptaController],
  providers: [ComptaService]
})

export class ComptaModule {}

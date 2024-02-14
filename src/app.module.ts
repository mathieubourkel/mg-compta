import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ComptaModule } from './compta/compta.module';

@Global()
@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}), 
      ComptaModule,
      MongooseModule.forRoot(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DNS}`,
        {dbName : process.env.MONGO_DB_NAME}
      )
    ]})
export class AppModule {}

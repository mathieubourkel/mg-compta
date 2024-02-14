import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ComptaModule } from './compta/compta.module';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}), 
      ComptaModule,
      MongooseModule.forRoot(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DNS}`,
        {dbName : "db-chappy-compta"}
      )
    ],
    providers: [AppService],
    exports : [AppService]})
export class AppModule {}

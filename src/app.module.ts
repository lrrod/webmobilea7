import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rodrigovergino:senha001@webmobile.7aqqtjf.mongodb.net/'),
    ConsumoEnergiaModule,
  ],
})
export class AppModule {}

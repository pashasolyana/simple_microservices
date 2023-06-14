import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_main'), ProductModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

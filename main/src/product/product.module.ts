import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports : [MongooseModule.forFeature([{name : Product.name, schema: ProductSchema}]), HttpModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

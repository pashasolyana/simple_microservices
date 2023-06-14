import { IProduct } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService,
        @Inject("PRODUCT_SERVICE") private readonly client: ClientProxy
    ){}

    @Post()
    async create(@Body() body:IProduct){
        const product = await this.productService.create(body);

        this.client.emit('product_created', product);
        return product
    }

    @Post(":id/like")
    async like(@Param('id') id:number){
        const product = await this.productService.getById(id)
        return this.productService.update(id, {likes : product.likes + 1})
    }
    
    @Get()
    async all(){
        return this.productService.all();
    }

    @Get(':id')
    async getById(@Param('id') id:number){
        return this.productService.getById(id)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body:IProduct):Promise<Product> {
        await this.productService.update(id, body)
        const product = await this.getById(id)
        this.client.emit('product_updated', product);
        return product
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.productService.delete(id)

        this.client.emit('product_delete', id);
        return {message : "OK"}
    }

}

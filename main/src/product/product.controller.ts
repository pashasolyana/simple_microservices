import { HttpService } from '@nestjs/axios';
import { Get, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        private httpService: HttpService
        ){}

    @Get()
    async getAll(){
        return this.productService.all();
    }

    @Post(":id/like")
    async like(@Param('id') id:number){
        const product = await this.productService.findOne(id)
        this.httpService.post(`http://localhost:8000/api/products/${id}`, {}).subscribe(
            res => {
                console.log(res)
            }
        )
        return this.productService.update(id, {likes : product.likes + 1})
    }

    @EventPattern("product_created")
    async productCreated(product: any) {
       this.productService.create(product)
    }

    @EventPattern("product_updated")
    async productUpdated(product: any) {
       this.productService.update(product.id, product)
    }

    @EventPattern("product_deleted")
    async productDeleted(id: number) {
       this.productService.delete(id)
    }
}

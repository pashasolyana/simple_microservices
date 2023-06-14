import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProduct } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){}

    async create(data:IProduct) : Promise<Product> {
        return this.productRepository.save(data)
    }

    async all(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getById(id:number): Promise<Product>{
        return this.productRepository.findOne({
            where: {
                id: id 
          }})
    }

    async update(id: number, data): Promise<any> {
        return this.productRepository.update(id, data);
    }

    async delete(id:number): Promise<any> {
        return this.productRepository.delete(id)
    }

}

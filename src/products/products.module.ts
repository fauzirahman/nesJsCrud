import { ProductsService } from './products.service';
import { ProducsController } from './products.controller';
import { Module } from '@nestjs/common';


@Module({
    controllers: [ProducsController],
    providers: [ProductsService],
})

export class ProductsModule {}

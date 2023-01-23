import { ProductsService } from './products.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

@Controller('products')
export class ProducsController{


    constructor(private readonly ProductsService: ProductsService) {}


    @Post()
    addProducts(
        @Body("title") prodTitle: string, 
        @Body("description") prodDesc: string, 
        @Body("price") prodPrice: number
        ): any {
            const generatedId = this.ProductsService.insertProduct(
                prodTitle, 
                prodDesc, 
                prodPrice
            );
            return { id: generatedId };
        }

    @Get()
    getAllProducts() {
        return this.ProductsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') ProdId: string) {
        return this.ProductsService.getSingleProduct(ProdId);
    }

    @Get('show/:id')
    showProduct(@Param('id') ProdId: string) {
        return this.ProductsService.getProduct(ProdId);
    }


    @Patch(":id")
    updateProduct(
        @Param('id') prodId: string,
        @Body("title") prodTitle: string, 
        @Body("description") prodDesc: string, 
        @Body("price") prodPrice: number        
        ) {
        this.ProductsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }


    @Delete(":id")
    removeProduct(@Param('id') prodId: string) {
        this.ProductsService.deleteProduct(prodId);
        return null;
    }

}
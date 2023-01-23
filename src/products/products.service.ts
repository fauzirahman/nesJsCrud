import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.products.find(prod => prod.id === productId);
        console.log(product)
        if (!product) {
            throw new NotFoundException('Could not found product');            
        }
        return { ...product }
    }

    getProduct(productId: string) {
        // return this.findProduct dari index pertama
        const product = this.findProduct(productId)[0];
        console.log(product)
        return { ...product }
    }

    deleteProduct(productId: string) {
        // return this.findProduct dari index kedua
        const index = this.findProduct(productId)[1];
        console.log(index);
        this.products.splice(index, 1)
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updateProduct = {...product}

        if(title) {
            updateProduct.title = title;
            console.log(title);
        }
        if(desc) {
            updateProduct.description = desc;
            console.log(desc);
        }
        if(price) {
            updateProduct.price = price;
            console.log(price);
        }

        console.log(updateProduct);
        this.products[index] = updateProduct;
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        console.log(productIndex)
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not found product');            
        }

        return [product, productIndex];
    }


}
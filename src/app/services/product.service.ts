import { Injectable } from '@angular/core';

import { BehaviorSubject, find } from 'rxjs';
import { Product } from '../interfaces/product.entity'
import { LocalStorageService } from './local-storage.service';
import { initializeProducts } from '../utils/product.util';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private products = new BehaviorSubject<Product[]>([]);
    products$ = this.products.asObservable();

    constructor(private localStorageService: LocalStorageService) {
        this.initializeData();
    }

    getProducts(categoryFilter?: string) {
        const products: Product[] = this.localStorageService.get('products');
        return categoryFilter ?
            this.products.next(products.filter(product => product.category === categoryFilter)) :
            this.products.next(products);
    }
    
    isQuantitySufficientToCart(productId: number, quantity: number): boolean {
        const products: Product[] = this.localStorageService.get('products');
        const findProduct = products.find(product => product.id === productId);
        if (findProduct) {
            return findProduct.quantity - quantity >= 0;
        }
        return false;
    }

    updateStock(productId: number, quantity: number, action: 'ADD'| 'SUBTRACT'): Product | null {
        const products: Product[] = this.localStorageService.get('products');
        const findProduct = products.find(product => product.id === productId);
        if (findProduct) {
            if(action === 'SUBTRACT') {
                findProduct.quantity -= quantity;
            }
            if(action === 'ADD') {
                findProduct.quantity += quantity;
            }
            this.save(products);
            return findProduct;
        }
        return null;
    }

    private save(products: Product[]) {
        this.localStorageService.set('products', products);
        this.products.next(products);
    }

    private initializeData() {
        const productsStored = this.localStorageService.get('products');
        const products = productsStored.length ? productsStored : initializeProducts();
        this.localStorageService.set('products', products);
    }
}
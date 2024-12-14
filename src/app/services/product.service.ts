import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.entity'
import { LocalStorageService } from './local-storage.service';
import { initializeProducts, updateQuantities } from '../utils/product.util';

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
        const products: Product[] = this.localStorageService.get<Product[]>('products') || [];
        const filterProducts = categoryFilter ?
            products.filter(product => product.category === categoryFilter) :
            products;
        this.products.next(filterProducts);
    }

    isQuantitySufficientToCart(productId: number, quantity: number): boolean {
        const products: Product[] = this.localStorageService.get<Product[]>('products') || [];
        const product = products.find(product => product.id === productId);

        if (!product) {
            console.warn(`Product with ${productId} not found.`);
            return false;
        }

        return product.quantity >= quantity;
    }

    updateStock(productId: number, quantity: number, action: 'ADD' | 'SUBTRACT'): Product | null {
        const products: Product[] = this.localStorageService.get<Product[]>('products') || [];
        const product = products.find(product => product.id === productId);

        if (!product) {
            console.warn(`Product with ${productId} not found.`);
            return null;
        }       
        product.quantity += action === 'ADD' ? quantity : -quantity;
        product.quantities = updateQuantities(product.quantity);
        this.save(products);
        return product;
    }

    private save(products: Product[]) {
        this.localStorageService.set('products', products);
        this.products.next(products);
    }

    private initializeData() {
        const productsStored = this.localStorageService.get<Product[]>('products') || [];
        const products = productsStored.length ? productsStored : initializeProducts();
        this.localStorageService.set('products', products);
        this.products.next(products);
    }
}
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.entity'
import { LocalStorageService } from './local-storage.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  constructor(private localStorageService: LocalStorageService, private productService: ProductService) {
    this.initializeData();
  }

  getMyCart() {
    const cartProducts: Product[] = this.localStorageService.get<Product[]>('cartProducts') || [];
    this.cart.next(cartProducts);
  }

  addToCart(productId: number, quantity: number) {
    if (quantity <= 0) {
      console.error('Quantity must be greater than zero.');
      return;
    }
    if (!this.productService.isQuantitySufficientToCart(productId, quantity)) {
      console.warn('Insufficient stock for product:', productId);
      return;
    }
    const product = this.productService.updateStock(productId, quantity, 'SUBTRACT');
    if (product) {
      this.updateCart(product, quantity);
    }
  }

  removeToCart(productId: number, quantity: number) {
    const product = this.productService.updateStock(productId, quantity, 'ADD');
    if (product) {
      const cartProducts = this.localStorageService.get<Product[]>('cartProducts') || [];
      this.save(cartProducts.filter(cartProduct => cartProduct.id !== productId));
    }
  }

  private updateCart(product: Product, quantity: number) {
    const cartProducts = this.localStorageService.get<Product[]>('cartProducts') || [];
    const cartProduct = cartProducts.find(p => p.id === product.id);
    if (!cartProduct) {
      cartProducts.push({ ...product, quantity });
    }
    else {
      cartProduct.quantity += quantity;
    }
    this.save(cartProducts);
  }

  private save(cartProducts: Product[]) {
    this.localStorageService.set('cartProducts', cartProducts);
    this.cart.next(cartProducts);
  }

  private initializeData() {
    const cartProducts = this.localStorageService.get<Product[]>('cartProducts') || [];
    this.cart.next(cartProducts);
  }
}
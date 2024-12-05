import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.entity'
import { LocalStorageService } from './local-storage.service';
import { initializeProducts } from '../utils/product.util';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private localStorageService: LocalStorageService) {
  }

  private products = new BehaviorSubject<Product[]>([]);
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();
  products$ = this.products.asObservable();

  getProducts(categoryFilter?: string) {
    let products: Product[] = this.localStorageService.get('products') as Product[];
    if(!products) {
      products = initializeProducts();
      this.localStorageService.set('products', products);
    }
    return categoryFilter ?
      this.products.next(products.filter(product => product.category === categoryFilter)) :
      this.products.next(products);
  }

  getMyCart() {
    let cartProducts: Product[] = this.localStorageService.get('cartProducts') as Product[];
    if (!cartProducts) {
      cartProducts = [];
    }
    this.updateCart(cartProducts);
  }

  addToCart(productId: number, quantity: number) {
    const products: Product[] = this.localStorageService.get('products') as Product[];
    const findProduct = products.find(p => p.id === productId);
    const findCartProduct = this.cart.value.find(p => p.id === productId);
    if (!findProduct) {
      alert('Product not found')
      return;
    }
    if (findProduct.quantity - quantity < 0) {
      alert('Sorry, product out of stock')
      return;
    }
    findProduct.quantity -= quantity;
    if(!findCartProduct) {
      this.cart.value.push({ ...findProduct, quantity });
    }
    else {
      findCartProduct.quantity += quantity;
    }
    this.localStorageService.set('products', products);
    this.products.next(products);
    this.updateCart(this.cart.value);
  }

  removeToCart(productId: number) {
    const products: Product[] = this.localStorageService.get('products') as Product[];
    const findCartProduct = this.cart.value.find(product => product.id === productId);
    const product = products.find(product => product.id === productId);
    if (!findCartProduct || !product) {
      alert('Product not found')
      return;
    }
    product.quantity += findCartProduct.quantity;
    this.updateCart(this.cart.value.filter(cartProduct => cartProduct.id != productId));
    this.localStorageService.set('products', products);
  }

  private updateCart(cartProducts: Product[]) {
    this.localStorageService.set('cartProducts', cartProducts);
    this.cart.next(cartProducts);
  }
}
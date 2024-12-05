import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.entity'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(private productService: ProductService, private cartService: CartService) { }
  products: Product[] = [];
  quantities: { [key: number]: number } = {}
  cartTotal: number = 0;

  ngOnInit() {
    this.productService.getProducts();
    this.cartService.getMyCart();
    this.productService.products$.subscribe(products => {
      this.products = products;
    })
    this.cartService.cart$.subscribe(cart => {
      this.cartTotal = cart.reduce((a, b) => a + b.quantity, 0);
    })
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, this.quantities[productId]);
    this.quantities[productId] = 1;
  }

  filterBycategory(category: string) {
    this.productService.getProducts(category);
  }
}

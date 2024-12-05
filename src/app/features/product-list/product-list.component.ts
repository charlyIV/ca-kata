import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.entity'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(private cartService: CartService) { }
  products: Product[] = [];
  quantities: { [key: number]: number } = {}
  cartTotal: number = 0;

  ngOnInit() {
    this.cartService.getProducts();
    this.cartService.getMyCart();
    this.cartService.products$.subscribe(products => {
      this.products = products;
    })
    this.cartService.cart$.subscribe(cart => {
      this.cartTotal = cart.reduce((a, b) => a + b.quantity, 0);
    })
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, this.quantities[productId]);
  }

  filterBycategory(category: string) {
    this.cartService.getProducts(category);
  }
}

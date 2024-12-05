import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private cartService: CartService) { }
  cartProducts: Product[] = [];
  total: { ht: number, ttc: number } = { ht: 0, ttc: 0 };


  ngOnInit() {
    this.cartService.getMyCart();
    this.cartService.cart$.subscribe(cart => {
      this.cartProducts = cart;
      this.total = {
        ht: this.cartProducts.reduce((a, product) => a + (product.quantity * product.price), 0),
        ttc: this.cartProducts.reduce((a, product) => a + (product.quantity * (product.price + product.taxValue)), 0)
      }
    })
  }

  removeToCart(productId: number, quantity: number) {
    this.cartService.removeToCart(productId, quantity);
  }
}

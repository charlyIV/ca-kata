import productsDb from '../datas/products.json';
import { Product } from '../interfaces/product.entity';
import { computeTaxValue } from '../utils/tax.util';

export function initializeProducts() {
  return productsDb.map(data => {
    return {
      ...data,
      quantities: updateQuantities(data.quantity),
      taxValue: computeTaxValue(data.category, data.isImported, data.price)
    } as Product;
  })
}

export function updateQuantities(quantity: number): number[] {
  return new Array(quantity).fill(0).map((_, index) => index + 1);
}
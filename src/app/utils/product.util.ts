import productsDb from '../datas/products.json';
import { Product } from '../interfaces/product.entity';
import { computeTaxValue } from '../utils/tax.util';

export function initializeProducts() {
    return productsDb.map(data => {
      return {
        ...data,
        taxValue: computeTaxValue(data.category, data.isImported, data.price)
      } as Product;
    })
  }
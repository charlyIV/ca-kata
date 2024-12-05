import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }
];
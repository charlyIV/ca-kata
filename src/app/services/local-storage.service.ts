import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.entity';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    get(key: string): Product[] {
        const data = localStorage.getItem(key);
        if (data)
            return JSON.parse(data);
        return [];
    }

    set(key: string, value: Product[]) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
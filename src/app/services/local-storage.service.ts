import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.entity';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    get<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        if (data)
            return JSON.parse(data) as T;
        return null;
    }

    set(key: string, value: Product[]): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
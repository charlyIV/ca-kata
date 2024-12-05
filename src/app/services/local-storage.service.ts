import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    get(key: string): Object | null {
        const data = localStorage.getItem(key);
        if (data)
            return JSON.parse(data);
        return null;
    }

    set(key: string, value: Object) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
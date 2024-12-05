export interface Product {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    quantities: number[];
    isImported: boolean;
    category: string;
    taxValue: number;
}
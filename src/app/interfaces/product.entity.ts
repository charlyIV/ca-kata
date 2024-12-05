export interface Product {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    initialQuantity: number;
    isImported: boolean;
    category: string;
    taxValue: number;
}
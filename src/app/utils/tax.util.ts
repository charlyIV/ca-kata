import taxesDb from '../datas/taxes.json';

export function computeTaxValue(category: string, isImported: boolean, price: number): number {
    const taxValue = (taxesDb[category as keyof typeof taxesDb] || 0) + (isImported ? 0.05 : 0);
    return customsArround(price * taxValue);
}

export function customsArround(value: number): number {
    return parseFloat((Math.ceil(parseFloat(value.toFixed(2)) / 0.05) * 0.05).toFixed(2));
}
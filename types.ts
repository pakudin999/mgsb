export type Page = 'landing' | 'calculator';

export type CategoryKey = 'rantai-tangan' | 'rantai-leher' | 'cincin-biasa' | 'cincin-special' | 'bangles';

export interface Subcategory {
    label: string;
    type: 'fixed' | 'per_gram';
    amount: number;
    description: string;
}

export interface Category {
    label: string;
    subcategories: Record<string, Subcategory>;
}

export interface CalculationResult {
    weight: number;
    price: number;
    goldValue: number;
    wageDescription: string;
    wageAmount: number;
    points: number;
    pointsDiscount: number;
    voucherDiscount: number;
    totalAmount: number;
}
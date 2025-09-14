
import type { Category, CategoryKey } from './types';

export const WAGE_CATEGORIES: Record<CategoryKey, Category> = {
    'rantai-tangan': {
        label: 'Rantai Tangan (RT)',
        subcategories: {
            'rt-biasa': { label: 'RT Biasa - RM70', type: 'fixed', amount: 70, description: 'Upah Biasa' },
            'rt-special': { label: 'RT Special - RM250', type: 'fixed', amount: 250, description: 'Upah Special' },
            'rt-dubai': { label: 'RT Dubai - RM100', type: 'fixed', amount: 100, description: 'Upah Dubai' },
            'rti': { label: 'RTI - Berat × RM50/g', type: 'per_gram', amount: 50, description: 'Upah Ikut Berat' },
            'rt-hardgold': { label: 'RT Hardgold - RM400', type: 'fixed', amount: 400, description: 'Upah Hardgold' },
        },
    },
    'rantai-leher': {
        label: 'Rantai Leher (RL)',
        subcategories: {
            'rl-biasa': { label: 'RL Biasa - RM70', type: 'fixed', amount: 70, description: 'Upah Biasa' },
            'rli': { label: 'RLI - Berat × RM50/g', type: 'per_gram', amount: 50, description: 'Upah Ikut Berat' },
            'rl-hardgold': { label: 'RL Hardgold - RM500', type: 'fixed', amount: 500, description: 'Upah Hardgold' },
        },
    },
    'cincin-biasa': {
        label: 'Cincin Biasa (CN)',
        subcategories: {
            'cn-biasa': { label: 'CN Biasa - RM70', type: 'fixed', amount: 70, description: 'Upah Biasa' },
            'cn-dubai': { label: 'CN Dubai - RM80', type: 'fixed', amount: 80, description: 'Upah Dubai' },
            'cni': { label: 'CNI - Berat × RM50/g', type: 'per_gram', amount: 50, description: 'Upah Ikut Berat' },
            'cn-hardgold': { label: 'CN Hardgold - RM200', type: 'fixed', amount: 200, description: 'Upah Hardgold' },
        },
    },
    'cincin-special': {
        label: 'Cincin Special (CS)',
        subcategories: {
            'cs': { label: 'CS - RM150', type: 'fixed', amount: 150, description: 'Upah Special' },
        },
    },
    'bangles': {
        label: 'Bangles (BG)',
        subcategories: {
            'bg-biasa': { label: 'BG Biasa - RM70', type: 'fixed', amount: 70, description: 'Upah Biasa' },
            'bgs': { label: 'BGS - RM250', type: 'fixed', amount: 250, description: 'Upah Special' },
            'bg-dubai': { label: 'BG Dubai - RM250', type: 'fixed', amount: 250, description: 'Upah Dubai' },
            'bgi': { label: 'BGI - Berat × RM50/g', type: 'per_gram', amount: 50, description: 'Upah Ikut Berat' },
        },
    },
};

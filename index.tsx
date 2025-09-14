
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// --- DEFINISI JENIS DATA (DARI types.ts) ---
type Page = 'landing' | 'calculator';

type CategoryKey = 'rantai-tangan' | 'rantai-leher' | 'cincin-biasa' | 'cincin-special' | 'bangles';

interface Subcategory {
    label: string;
    type: 'fixed' | 'per_gram';
    amount: number;
    description: string;
}

interface Category {
    label: string;
    subcategories: Record<string, Subcategory>;
}

interface CalculationResult {
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

// --- PEMALAR (DARI constants.ts) ---
const WAGE_CATEGORIES: Record<CategoryKey, Category> = {
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

// --- KOMPONEN: LandingPage (DARI components/LandingPage.tsx) ---
interface LandingPageProps {
  onStart: () => void;
  onReview: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onReview }) => {
  return (
    <div className="flex flex-col items-center h-full text-center p-4 pt-20 md:pt-24">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight animate-pulse">
          SYSTEM MIRAGOLD
        </h1>
        <p className="text-md md:text-lg text-slate-500 mb-8 font-light tracking-wide">
          Sistem Pengiraan Emas Automatik
        </p>
        <button
          onClick={onStart}
          className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-10 py-4 rounded-xl text-lg font-light shadow-lg shadow-cyan-500/30 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1"
        >
          System Calculation Emas
        </button>
        <button
          onClick={onReview}
          className="w-full md:w-auto mt-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-light shadow-lg shadow-emerald-500/30 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1"
        >
          Review Kedai
        </button>
      </div>
    </div>
  );
};


// --- KOMPONEN: CalculatorPage (DARI components/CalculatorPage.tsx) ---
interface CalculatorPageProps {
  onBack: () => void;
}

interface ResultItemProps {
    label: string;
    value: string;
    isTotal?: boolean;
}

const ResultItem: React.FC<ResultItemProps> = ({ label, value, isTotal = false }) => (
    <div className={`flex justify-between items-center py-2 ${!isTotal ? 'border-b border-cyan-200/50' : ''}`}>
        <span className={`text-slate-600 ${isTotal ? 'font-semibold text-cyan-800 text-lg' : ''}`}>{label}:</span>
        <span className={`font-medium text-slate-800 ${isTotal ? 'font-bold text-cyan-800 text-lg' : ''}`}>{value}</span>
    </div>
);

const CalculatorPage: React.FC<CalculatorPageProps> = ({ onBack }) => {
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<CategoryKey | ''>('');
  const [subcategory, setSubcategory] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [points, setPoints] = useState('');
  const [useVoucher, setUseVoucher] = useState(false);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as CategoryKey | '');
    setSubcategory(''); // Reset subcategory when category changes
  };

  const handleCalculate = () => {
    const formattedWeight = weight.replace(',', '.');
    const formattedPrice = price.replace(',', '.');

    const numWeight = parseFloat(formattedWeight);
    const numPrice = parseFloat(formattedPrice);

    if (isNaN(numWeight) || numWeight <= 0 || isNaN(numPrice) || numPrice <= 0 || !category || !subcategory) {
      alert('Sila lengkapkan semua maklumat yang diperlukan dengan nilai yang betul.');
      return;
    }

    const subcategoryData = WAGE_CATEGORIES[category].subcategories[subcategory];
    if (!subcategoryData) {
      alert('Subkategori tidak sah.');
      return;
    }

    const goldValue = numWeight * numPrice;
    let wageAmount = 0;
    
    if (subcategoryData.type === 'fixed') {
      wageAmount = subcategoryData.amount;
    } else if (subcategoryData.type === 'per_gram') {
      wageAmount = numWeight * subcategoryData.amount;
    }

    const numPoints = parseInt(points) || 0;
    const pointsDiscount = usePoints ? Math.floor(numPoints / 1000) * 10 : 0;
    const voucherDiscount = useVoucher ? 50 : 0;
    const totalAmount = goldValue + wageAmount - pointsDiscount - voucherDiscount;

    setResults({
      weight: numWeight,
      price: numPrice,
      goldValue,
      wageDescription: subcategoryData.type === 'per_gram' ? `${subcategoryData.description} (${numWeight.toFixed(2)}g × RM${subcategoryData.amount})` : subcategoryData.description,
      wageAmount,
      points: numPoints,
      pointsDiscount,
      voucherDiscount,
      totalAmount,
    });
  };

  const handleReset = () => {
    setWeight('');
    setPrice('');
    setCategory('');
    setSubcategory('');
    setUsePoints(false);
    setPoints('');
    setUseVoucher(false);
    setResults(null);
  };
  
  const selectedSubcategories = category ? WAGE_CATEGORIES[category].subcategories : {};

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button onClick={onBack} className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg mb-4 transition-colors hover:bg-slate-300">
        &larr; Kembali
      </button>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">SYSTEM MIRAGOLD</h1>
        <p className="text-slate-500">Kalkulator Emas 916</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Form Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200/50">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Maklumat Emas</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="weight" className="block font-medium text-slate-700 mb-2">Berat Emas (gram)</label>
              <input type="text" inputMode="decimal" id="weight" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Masukkan berat dalam gram" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition"/>
            </div>
            <div>
              <label htmlFor="price" className="block font-medium text-slate-700 mb-2">Harga Semasa Per Gram (RM)</label>
              <input type="text" inputMode="decimal" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="Masukkan harga per gram" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition"/>
            </div>
            <div>
              <label htmlFor="category" className="block font-medium text-slate-700 mb-2">Kategori Upah</label>
              <select id="category" value={category} onChange={handleCategoryChange} className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition bg-white">
                <option value="">Pilih Kategori</option>
                {Object.entries(WAGE_CATEGORIES).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </div>
            
            {category && (
              <div className="p-4 bg-slate-50 rounded-lg">
                <label className="block font-medium text-slate-700 mb-3">Jenis {WAGE_CATEGORIES[category].label}:</label>
                <div className="space-y-2">
                  {Object.entries(selectedSubcategories).map(([key, sub]) => (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="subcategory" value={key} checked={subcategory === key} onChange={e => setSubcategory(e.target.value)} className="w-4 h-4 text-cyan-600 border-slate-300 focus:ring-cyan-500"/>
                      <span className="text-slate-600">{sub.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
                <label className="flex items-center space-x-3 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={usePoints} onChange={e => setUsePoints(e.target.checked)} className="w-4 h-4 rounded text-cyan-600 border-slate-300 focus:ring-cyan-500"/>
                    <span>Tebus Point (1000 point = RM10)</span>
                </label>
                {usePoints && (
                    <input type="number" id="points" value={points} onChange={e => setPoints(e.target.value)} placeholder="Masukkan jumlah point" min="0" className="mt-2 w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition"/>
                )}
            </div>

            <div>
                <label className="flex items-center space-x-3 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={useVoucher} onChange={e => setUseVoucher(e.target.checked)} className="w-4 h-4 rounded text-cyan-600 border-slate-300 focus:ring-cyan-500"/>
                    <span>Guna Baucer RM50</span>
                </label>
            </div>

            <button onClick={handleCalculate} className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-3 rounded-lg font-semibold text-lg shadow-md shadow-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5">
              Kira Jumlah
            </button>
          </div>
        </div>
        
        {/* Results Card */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-cyan-300">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Keputusan Pengiraan</h2>
            <div className="space-y-3">
              {results ? (
                <>
                  <ResultItem label="Berat Emas" value={`${results.weight.toFixed(2)}g`} />
                  <ResultItem label="Harga Per Gram" value={`RM${results.price.toFixed(2)}`} />
                  <ResultItem label="Nilai Emas" value={`RM${results.goldValue.toFixed(2)}`} />
                  <ResultItem label={results.wageDescription} value={`+RM${results.wageAmount.toFixed(2)}`} />
                  {usePoints && results.points > 0 && (
                     <ResultItem label={`Tebus Point (${results.points} point)`} value={`-RM${results.pointsDiscount.toFixed(2)}`} />
                  )}
                  {useVoucher && (
                    <ResultItem label="Diskaun Baucer" value={`-RM${results.voucherDiscount.toFixed(2)}`} />
                  )}
                  <div className="pt-3 mt-3 border-t-2 border-cyan-200">
                    <ResultItem label="Jumlah Keseluruhan" value={`RM${results.totalAmount.toFixed(2)}`} isTotal={true} />
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-500 py-10">
                  <p>Masukkan maklumat untuk melihat keputusan</p>
                </div>
              )}
            </div>
             {results && (
                <button onClick={handleReset} className="w-full mt-6 bg-slate-200 text-slate-600 p-2 rounded-lg transition-colors hover:bg-slate-300 text-sm">
                    Reset Ke Awal
                </button>
            )}
        </div>
      </div>
    </div>
  );
};


// --- KOMPONEN UTAMA: App (DARI App.tsx) ---
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const showCalculator = () => setCurrentPage('calculator');
  const showLanding = () => setCurrentPage('landing');

  const reviewUrl = 'https://www.google.com/search?sca_esv=fbbb9e7ad2f09f93&rlz=1C1GCEA_enMY1179MY1179&sxsrf=AE3TifOm2KdKlJuxeNxx94TZWSdMmghdpQ:1757834770479&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E2bk24uW-XzWdHvCSFMVypQe_SoCnvOBkYV0-_2Bng9zBj8dXv2KgB8zfuT3qLFZkAJzex5GTwIUcPxXYbIOqnVKl6bo5rChew8M9D1nxe1L_g1GoQ%3D%3D&q=KEDAI+EMAS+MIRAGOLD+PASIR+GUDANG+Ulasan&sa=X&ved=2ahUKEwio1MXo3NePAxU-S2wGHSayDw4Q0bkNegQINRAE&biw=1536&bih=738&dpr=1.25';
  const openReview = () => window.open(reviewUrl, '_blank');

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen text-slate-700 font-sans flex flex-col">
      <main className="flex-grow">
        {currentPage === 'landing' && <LandingPage onStart={showCalculator} onReview={openReview} />}
        {currentPage === 'calculator' && <CalculatorPage onBack={showLanding} />}
      </main>
      <footer className="text-center py-4">
        <p className="text-xs text-slate-400 font-extralight">
          credit CreativeMarketing
        </p>
      </footer>
    </div>
  );
};

// --- TITIK PERMULAAN APLIKASI ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

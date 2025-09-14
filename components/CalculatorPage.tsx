import React, { useState } from 'react';
import type { CalculationResult, CategoryKey } from '../types';
import { WAGE_CATEGORIES } from '../constants';

interface CalculatorPageProps {
  onBack: () => void;
}

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


export default CalculatorPage;
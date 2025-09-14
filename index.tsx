import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- DEFINISI JENIS DATA ---
type Page = 'landing' | 'calculator' | 'registration' | 'membersList';

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

// --- PEMALAR ---
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

// --- KOMPONEN: LandingPage ---
interface LandingPageProps {
  onStart: () => void;
  onRegister: () => void;
  onReview: () => void;
  onViewMembers: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onRegister, onReview, onViewMembers }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight animate-pulse">
          SYSTEM MIRAGOLD
        </h1>
        <p className="text-md md:text-lg text-slate-500 mb-8 font-light tracking-wide">
          Sistem Pengiraan Emas Automatik
        </p>
        <div className="flex flex-col items-center space-y-4">
            <button
              onClick={onStart}
              className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-10 py-4 rounded-xl text-lg font-light shadow-lg shadow-cyan-500/30 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1"
            >
              System Calculation Emas
            </button>
            <button
              onClick={onRegister}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-light shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              Pendaftaran Ahli
            </button>
             <button
              onClick={onViewMembers}
              className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-xl font-light shadow-lg shadow-purple-500/30 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-1"
            >
              Lihat Senarai Ahli
            </button>
            <button
              onClick={onReview}
              className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-light shadow-lg shadow-emerald-500/30 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1"
            >
              Review Kedai
            </button>
        </div>
      </div>
    </div>
  );
};


// --- KOMPONEN: CalculatorPage ---
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
  
  const selectedSubcategories = category ? WAGE_CATEGORIES[category].label : '';

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
                <label className="block font-medium text-slate-700 mb-3">Jenis {selectedSubcategories}:</label>
                <div className="space-y-2">
                  {Object.entries(WAGE_CATEGORIES[category].subcategories).map(([key, sub]) => (
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

// --- KOMPONEN: RegistrationPage ---
interface RegistrationPageProps {
  onBack: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [ic, setIc] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXUxvzelN69ypQDzXoCaTzDnBqWMzBzNQuBBBzsF0aejAvFYwSsjOIFGoGz_rsi2ha/exec'; 

  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  
  /*
    ================================ PENTING: KEMAS KINI GOOGLE APPS SCRIPT ANDA ================================
    Untuk membetulkan ralat CORS dan membolehkan aplikasi ini menerima respons daripada skrip anda,
    anda WAJIB menambah `.withHeaders({'Access-Control-Allow-Origin': '*'})` pada skrip anda.

    1. Buka Google Apps Script anda.
    2. Cari baris `.setMimeType(ContentService.MimeType.JSON)` dalam fungsi `doPost`.
    3. Tambah `.withHeaders({'Access-Control-Allow-Origin': '*'})` selepasnya.

    CONTOH SEBELUM:
    return ContentService.createTextOutput(JSON.stringify({ result: "OK" }))
      .setMimeType(ContentService.MimeType.JSON);

    CONTOH SELEPAS (YANG BETUL):
    return ContentService.createTextOutput(JSON.stringify({ result: "OK" }))
      .setMimeType(ContentService.MimeType.JSON)
      .withHeaders({'Access-Control-Allow-Origin': '*'});

    4. Lakukan ini untuk KEDUA-DUA blok 'return' (untuk 'success' dan 'error').
    5. DEPLOY SEMULA skrip anda (Deploy > New deployment). Ini WAJIB dilakukan.
    ===========================================================================================================
  */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !ic || !phone || !date || !time) {
      alert('Sila lengkapkan semua maklumat.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const submissionData = {
      nama: name,
      kad: ic,
      telefon: phone,
      tarikh: date,
      masa: time,
    };
    
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        // Menggunakan 'text/plain' untuk mengelakkan isu CORS 'preflight' dengan Google Apps Script.
        // Skrip anda masih boleh membaca data ini sebagai JSON tanpa sebarang perubahan.
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(submissionData),
    })
    .then(response => {
      // Semak jika respons daripada server adalah OK (status 2xx)
      if (!response.ok) {
        throw new Error(`Ralat Rangkaian: ${response.status} ${response.statusText}`);
      }
      return response.json(); // Proseskan respons sebagai JSON
    })
    .then(data => {
      // Semak jika skrip itu sendiri mengembalikan mesej ralat
      if (data.error) {
        throw new Error(`Ralat Skrip: ${data.error}`);
      }
      
      // Jika tiada ralat, anggap berjaya
      setSubmitStatus('success');
      setName('');
      setIc('');
      setPhone('');
      setDate('');
      setTime('');
    })
    .catch(error => {
      console.error('Submission error:', error);
      setErrorMessage(error.message);
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button onClick={onBack} className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg mb-4 transition-colors hover:bg-slate-300">
        &larr; Kembali
      </button>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">BORANG PENDAFTARAN AHLI</h1>
        <p className="text-slate-500">Sila isi maklumat di bawah untuk pendaftaran</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium text-slate-700 mb-2">Nama Penuh</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Masukkan nama penuh" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition" required />
            </div>
            <div>
              <label htmlFor="ic" className="block font-medium text-slate-700 mb-2">Nombor Kad Pengenalan</label>
              <input type="text" id="ic" value={ic} onChange={e => setIc(e.target.value)} placeholder="Contoh: 900101-01-1234" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition" required />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium text-slate-700 mb-2">Nombor Telefon</label>
              <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Contoh: 012-3456789" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition" required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="date" className="block font-medium text-slate-700 mb-2">Pilih Tarikh</label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} min={today} className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition" required />
                </div>
                <div>
                    <label htmlFor="time" className="block font-medium text-slate-700 mb-2">Pilih Masa</label>
                    <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 transition" required />
                </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-semibold text-lg shadow-md shadow-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Menghantar...' : 'Hantar Pendaftaran'}
            </button>

            {submitStatus === 'success' && (
                <div className="mt-4 text-center p-3 bg-emerald-100 text-emerald-800 rounded-lg">Pendaftaran berjaya! Kami akan menghubungi anda tidak lama lagi.</div>
            )}
            {submitStatus === 'error' && (
                <div className="mt-4 text-center p-3 bg-red-100 text-red-800 rounded-lg">
                  <p>Gagal menghantar. Sila semak sambungan internet anda dan cuba lagi.</p>
                  {errorMessage && <p className="text-xs mt-1">Maklumat Ralat: {errorMessage}</p>}
                </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};


// --- KOMPONEN: MembersListPage ---
interface MembersListPageProps {
  onBack: () => void;
}

interface Member {
  nama: string;
  kad: string;
  telefon: string;
  tarikh: string;
  masa: string;
  timestamp: string;
}

const MembersListPage: React.FC<MembersListPageProps> = ({ onBack }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
    ================================ PENTING: ARAHAN UNTUK GOOGLE APPS SCRIPT (GET DATA) ================================
    1. Cipta Google Apps Script BARU atau guna yang sedia ada untuk FUNGSI GET (membaca data).
    2. Guna kod di bawah untuk fungsi `doGet()` dalam skrip anda.
       Struktur lajur dalam Sheet anda sepatutnya: Lajur A: Nama, B: Kad, C: Telefon, D: Tarikh, E: Masa, F: Timestamp

       function doGet(e) {
         try {
           const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Ganti "Sheet1" dengan nama sheet anda
           const data = sheet.getDataRange().getValues();
           const headers = data.shift(); // Buang baris header
           const records = data.map(row => ({
             nama: row[0], kad: row[1], telefon: row[2], tarikh: row[3], masa: row[4], timestamp: row[5]
           }));
           
           // PENTING: Tambah .withHeaders({'Access-Control-Allow-Origin': '*'}) untuk elak ralat CORS
           return ContentService.createTextOutput(JSON.stringify(records))
             .setMimeType(ContentService.MimeType.JSON)
             .withHeaders({'Access-Control-Allow-Origin': '*'});

         } catch (err) {
            // PENTING: Tambah header di sini juga untuk mesej ralat
            return ContentService.createTextOutput(JSON.stringify({error: err.message}))
              .setMimeType(ContentService.MimeType.JSON)
              .withHeaders({'Access-Control-Allow-Origin': '*'});
         }
       }
    3. Deploy skrip sebagai Web App (Access: Anyone).
    4. GANTIKAN URL di bawah dengan URL Web App anda yang BARU.
    ======================================================================================================================
  */
  const MEMBERS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOyyvJnbgpHzdPjz0nXNvvNevWE5Siwob6bctKLUCk2Y0_RUldLWJun9lifjPItwTD/exec';

  useEffect(() => {
    if (MEMBERS_SCRIPT_URL.includes('GANTIKAN_DENGAN_URL')) {
        setError('Sila konfigurasikan URL Google Apps Script untuk memaparkan senarai ahli.');
        setIsLoading(false);
        return;
    }

    fetch(MEMBERS_SCRIPT_URL)
      .then(response => {
        if (!response.ok) throw new Error('Gagal mendapatkan data. Semak URL skrip dan kebenaran akses.');
        return response.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        setMembers(data.reverse()); // Tunjuk pendaftaran terbaru dahulu
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 w-full">
      <button onClick={onBack} className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg mb-4 transition-colors hover:bg-slate-300">
        &larr; Kembali
      </button>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">SENARAI AHLI BERDAFTAR</h1>
        <p className="text-slate-500">Berikut adalah senarai ahli yang telah mendaftar.</p>
      </div>
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-slate-200/50">
        {isLoading ? (
          <div className="text-center text-slate-500 py-10">Memuatkan data ahli...</div>
        ) : error ? (
          <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-3">Nama</th>
                  <th scope="col" className="px-6 py-3">No. Telefon</th>
                  <th scope="col" className="px-6 py-3">Tarikh Temujanji</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0 ? members.map((member, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{member.nama}</td>
                    <td className="px-6 py-4">{member.telefon}</td>
                    <td className="px-6 py-4">{new Date(member.tarikh).toLocaleDateString('ms-MY', { day: '2-digit', month: 'long', year: 'numeric' })} @ {member.masa}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="text-center py-10 text-slate-500">Tiada data ahli ditemui.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


// --- KOMPONEN UTAMA: App ---
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const showCalculator = () => setCurrentPage('calculator');
  const showRegistration = () => setCurrentPage('registration');
  const showMembersList = () => setCurrentPage('membersList');
  const showLanding = () => setCurrentPage('landing');

  const reviewUrl = 'https://www.google.com/search?q=KEDAI+EMAS+MIRAGOLD+PASIR+GUDANG+Ulasan';
  const openReview = () => window.open(reviewUrl, '_blank');

  const pageContent = () => {
    switch (currentPage) {
      case 'calculator':
        return <CalculatorPage onBack={showLanding} />;
      case 'registration':
        return <RegistrationPage onBack={showLanding} />;
      case 'membersList':
        return <MembersListPage onBack={showLanding} />;
      case 'landing':
      default:
        return <LandingPage onStart={showCalculator} onRegister={showRegistration} onReview={openReview} onViewMembers={showMembersList} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen text-slate-700 font-sans flex flex-col">
      <main className="flex-grow grid place-items-center">
        {pageContent()}
      </main>
      <footer className="text-center py-4">
        <p className="text-xs text-slate-400 font-extralight">
          credit CreativeMarketing
        </p>
      </footer>
    </div>
  );
};

// --- RENDER APLIKASI ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
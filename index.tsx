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

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby95Vsjs07-z8o0rO9tdVDAeuvGY13Brcol_YGBEmi2pSyXZUnxRQ7M4VQgoW4JP75G/exec'; 

  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  
  /*
    ================================ PENTING: KOD GOOGLE APPS SCRIPT (FIXED) ================================
    ANDA MESTI MENGGUNAKAN KOD INI DI GOOGLE APPS SCRIPT UNTUK MEMBETULKAN RALAT.

    MASALAH SEMASA: Nombor Kad Pengenalan (IC) atau nombor telefon yang panjang mungkin kehilangan digit pertama
    apabila disimpan dalam Google Sheet. Ini kerana Google Sheet secara automatik menukarnya kepada format nombor.

    PENYELESAIAN: Skrip di bawah memaksa Google Sheet untuk menyimpan nombor IC dan telefon sebagai TEKS BIASA
    dengan menambah tanda petik tunggal (') di hadapannya (contoh: "'" + data.kad). Ini adalah satu-satunya
    cara untuk membetulkan isu ini.

    LANGKAH-LANGKAH:
    1. SALIN keseluruhan kod di bawah.
    2. GANTIKAN kod lama dalam editor Google Apps Script anda dengan kod baru ini.
    3. DEPLOY SEMULA skrip anda (Deploy > New deployment).
    
    // === GLOBAL CONFIG ===
    const SPREADSHEET_ID = "1OmePAkBy2jjTmMo5g5JxHMyseMR1JymB6bTueJMCRw4";
    const SHEET_NAME = "Sheet1";

    // --- FUNGSI BANTUAN: TUKAR MASA 24 JAM -> 12 JAM (AM/PM) ---
    function convertTo12Hour(time24) {
      if (!time24) return "";
      const [hours, minutes] = time24.split(":");
      const h = parseInt(hours);
      const period = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${period}`;
    }

    // === FUNGSI: SIMPAN DATA DARI BORANG (doPost) ===
    function doPost(e) {
      try {
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

        // PENTING: Memaksa nombor panjang disimpan sebagai teks untuk elak ralat format
        sheet.appendRow([
          data.nama,
          "'" + data.kad,      // Simpan IC sebagai teks
          "'" + data.telefon,  // Simpan telefon sebagai teks
          data.tarikh,
          convertTo12Hour(data.masa),
          Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd h:mm:ss a")
        ]);

        return ContentService.createTextOutput(JSON.stringify({ result: "OK" }))
          .setMimeType(ContentService.MimeType.JSON);

      } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // === FUNGSI: BACA DATA UNTUK SENARAI AHLI (doGet) ===
    function doGet(e) {
      try {
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
        
        // KEMAS KINI PENTING: Gunakan .getDisplayValues() untuk elak ralat format masa
        const data = sheet.getDataRange().getDisplayValues();
        data.shift(); // Buang header

        const filtered = data.map(row => [
          row[0] || '-',  // Nama (Lajur A)
          row[3] || '-',  // Tarikh (Lajur D)
          row[4] || '-'   // Masa (Lajur E)
        ]);

        return ContentService.createTextOutput(JSON.stringify(filtered))
          .setMimeType(ContentService.MimeType.JSON);

      } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    =============================================================================================================
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
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(submissionData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ralat Rangkaian: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(`Ralat Skrip: ${data.error}`);
      }
      
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
        <p className="text-slate-500">Kerjasama Anda Amat Dihargai</p>
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

// Format data baru daripada skrip: [Nama, Tarikh, Masa]
type Member = [string, string, string];
type Tab = 'today' | 'yesterday' | 'all';

const MembersListPage: React.FC<MembersListPageProps> = ({ onBack }) => {
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [todayMembers, setTodayMembers] = useState<Member[]>([]);
  const [yesterdayMembers, setYesterdayMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('today');

  const MEMBERS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby95Vsjs07-z8o0rO9tdVDAeuvGY13Brcol_YGBEmi2pSyXZUnxRQ7M4VQgoW4JP75G/exec';

  useEffect(() => {
    fetch(MEMBERS_SCRIPT_URL)
      .then(response => {
        if (!response.ok) throw new Error('Gagal mendapatkan data. Semak URL skrip dan kebenaran akses.');
        return response.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        if (!Array.isArray(data)) throw new Error('Format data tidak dijangka diterima daripada skrip.');
        
        const sortedData = data.sort((a, b) => {
            try {
                const dateA = new Date(`${a[1]} ${a[2]}`);
                const dateB = new Date(`${b[1]} ${b[2]}`);
                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
                return dateB.getTime() - dateA.getTime();
            } catch (e) {
                return 0;
            }
        });

        if (sortedData.length === 0) {
            setTodayMembers([]);
            setYesterdayMembers([]);
            setAllMembers([]);
            return;
        }

        // --- LOGIK PENAPISAN TARIKH BARU ---
        // 1. Dapatkan tarikh paling terkini daripada data yang telah diisih.
        const latestDateStr = sortedData[0][1]; // Contoh: "2025-09-16"

        // 2. Cipta tarikh "semalam" berdasarkan tarikh terkini untuk mengelak isu zon masa.
        const dateParts = latestDateStr.split('-').map(part => parseInt(part, 10));
        const latestDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        
        const yesterdayDate = new Date(latestDate);
        yesterdayDate.setDate(latestDate.getDate() - 1);

        const formatDateToYMD = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const yesterdayStr = formatDateToYMD(yesterdayDate);
        
        // 3. Tapis data berdasarkan tarikh terkini ("Hari Ini") dan semalam.
        const todayList = sortedData.filter(member => member[1] === latestDateStr);
        const yesterdayList = sortedData.filter(member => member[1] === yesterdayStr);

        // 4. Kemas kini state.
        setTodayMembers(todayList);
        setYesterdayMembers(yesterdayList);
        setAllMembers(sortedData);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Kad untuk setiap ahli
  const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
    const formatDate = (dateInput: string): string => {
        try {
            const date = new Date(dateInput);
            if (isNaN(date.getTime())) return dateInput;
            return date.toLocaleDateString('ms-MY', {
                day: '2-digit', month: 'long', year: 'numeric'
            });
        } catch (e) { return dateInput; }
    };
    
    const formatTime = (timeInput: string): string => {
        if (!timeInput) return '-';
        try {
            if (timeInput.startsWith('1899-12-') && timeInput.includes('T')) {
                const date = new Date(timeInput);
                if (!isNaN(date.getTime())) {
                    return date.toLocaleTimeString('en-US', {
                        hour: 'numeric', minute: '2-digit', hour12: true,
                    });
                }
            }
            return timeInput;
        } catch (e) { return timeInput; }
    };

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-lg font-semibold text-slate-800 mb-3">{member[0]}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-slate-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(member[1])}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTime(member[2])}</span>
            </div>
          </div>
        </div>
    );
  };

  interface TabButtonProps {
      label: string; count: number; isActive: boolean; onClick: () => void;
  }
  const TabButton: React.FC<TabButtonProps> = ({ label, count, isActive, onClick }) => (
      <button
          onClick={onClick}
          className={`px-4 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none ${
              isActive ? 'border-b-2 border-cyan-500 text-cyan-600' : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-current={isActive ? 'page' : undefined}
      >
          {label} <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-cyan-100 text-cyan-700' : 'bg-slate-200 text-slate-600'}`}>{count}</span>
      </button>
  );

  const MemberSkeletonLoader = () => (
    <div className="space-y-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white/80 rounded-xl p-5 border border-slate-200/80">
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState: React.FC<{ tab: Tab }> = ({ tab }) => {
    const messages = {
        today: { title: 'Tiada Pendaftaran Untuk Hari Ini', body: 'Belum ada ahli baru yang mendaftar pada hari ini.' },
        yesterday: { title: 'Tiada Pendaftaran Semalam', body: 'Tiada pendaftaran direkodkan pada hari semalam.' },
        all: { title: 'Tiada Pendaftaran Ditemui', body: 'Jadilah orang pertama yang mendaftar dan nama anda akan dipaparkan di sini.' }
    };
    const { title, body } = messages[tab];
    return (
        <div className="text-center py-20 px-6 bg-slate-100/50 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-slate-700">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{body}</p>
        </div>
    );
  };
  
  const renderContent = () => {
    if (isLoading) return <MemberSkeletonLoader />;
    if (error) return <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>;

    let listToRender: Member[] = [];
    switch (activeTab) {
        case 'today': listToRender = todayMembers; break;
        case 'yesterday': listToRender = yesterdayMembers; break;
        case 'all': listToRender = allMembers; break;
    }

    if (listToRender.length === 0) return <EmptyState tab={activeTab} />;
    
    return (
      <div className="space-y-4">
        {listToRender.map((member, index) => (
          <MemberCard key={`${activeTab}-${index}`} member={member} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-3xl">
      <button onClick={onBack} className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg mb-6 transition-colors hover:bg-slate-300">
        &larr; Kembali
      </button>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Senarai Ahli</h1>
        <p className="text-slate-500 mt-2">Telah Diverfikasi Ke Sistem ✅</p>
      </div>
      
      <div className="mb-6 flex border-b border-slate-200">
          <TabButton label="Hari Ini" count={todayMembers.length} isActive={activeTab === 'today'} onClick={() => setActiveTab('today')} />
          <TabButton label="Semalam" count={yesterdayMembers.length} isActive={activeTab === 'yesterday'} onClick={() => setActiveTab('yesterday')} />
          <TabButton label="Semua" count={allMembers.length} isActive={activeTab === 'all'} onClick={() => setActiveTab('all')} />
      </div>
      
      {renderContent()}

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

  const reviewUrl = 'https://www.google.com/search?sca_esv=2d0e28ee0f8eead4&rlz=1C1GCEA_enMY1179MY1179&sxsrf=AE3TifNDFXS2Lyqadw0NLMytha2fLjsniw:1757870110731&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E2bk24uW-XzWdHvCSFMVypQe_SoCnvOBkYV0-_2Bng9zBj8dXv2KgB8zfuT3qLFZkAJzex5GTwIUcPxXYbIOqnVKl6bo5rChew8M9D1nxe1L_g1GoQ%3D%3D&q=KEDAI+EMAS+MIRAGOLD+PASIR+GUDANG+Ulasan&sa=X&ved=2ahUKEwiNuYu84NiPAxX84DgGHfnwAYIQ0bkNegQILxAE&biw=1536&bih=738&dpr=1.25';
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
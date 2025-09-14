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

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwB6gkWG84xBvxXrGb9zPwq0_MCezWHouUN4KtZ9imJYqC2NIzONzM7sdYIFkB6ZOn/exec'; 

  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  
  /*
    ================================ PENTING: KEMAS KINI GOOGLE APPS SCRIPT (FUNGSI doPost) ================================
    Untuk membetulkan ralat CORS dan membolehkan borang ini berfungsi, anda WAJIB menambah `.withHeaders(...)` pada skrip anda.
    SALIN & TAMPAL KOD `doPost` DI BAWAH INI KE DALAM EDITOR SKRIP ANDA.

    function doPost(e) {
      try {
        const data = JSON.parse(e.postData.contents);
        const ssId = "GANTIKAN_DENGAN_ID_SHEET_ANDA"; // <--- GANTI ID DI SINI
        const sheet = SpreadsheetApp.openById(ssId).getSheetByName("Sheet1");
        sheet.appendRow([ data.nama, data.kad, data.telefon, data.tarikh, data.masa, new Date() ]);

        // BARIS PENTING DI BAWAH INI
        return ContentService.createTextOutput(JSON.stringify({ result: "OK" }))
          .setMimeType(ContentService.MimeType.JSON)
          .withHeaders({'Access-Control-Allow-Origin': '*'}); // <-- WAJIB ADA INI

      } catch (error) {
        // BARIS PENTING DI BAWAH INI JUGA
        return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
          .setMimeType(ContentService.MimeType.JSON)
          .withHeaders({'Access-Control-Allow-Origin': '*'}); // <-- WAJIB ADA INI
      }
    }
    
    INGAT: Selepas menukar skrip, anda WAJIB DEPLOY SEMULA (Deploy > New deployment).
    =========================================================================================================================
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

// Format data baru daripada skrip: [Nama, Tarikh, Masa]
type Member = [string, string, string];

const MembersListPage: React.FC<MembersListPageProps> = ({ onBack }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
    ================================ PENTING: KEMAS KINI GOOGLE APPS SCRIPT (FUNGSI doGet) ================================
    Untuk membetulkan ralat masa "1899" dan memastikan data dipaparkan dengan betul, GANTIKAN fungsi `doGet` lama anda
    dengan kod di bawah ini. Skrip ini akan memformatkan tarikh dan masa dengan betul di server.
    SALIN & TAMPAL SEMUA KOD `doGet` INI KE DALAM EDITOR SKRIP ANDA.

    function doGet(e) {
      try {
        const ssId = "GANTIKAN_DENGAN_ID_SHEET_ANDA"; // <--- GANTI ID DI SINI
        const sheet = SpreadsheetApp.openById(ssId).getSheetByName("Sheet1");
        const data = sheet.getDataRange().getValues();
        data.shift(); // Buang baris header
        
        const records = data.map(row => {
          // Selaraskan zon masa kepada Malaysia/Singapura
          const timeZone = "Asia/Kuala_Lumpur";
          
          // Format Tarikh (Lajur D)
          let formattedDate = '';
          if (row[3] && row[3] instanceof Date) {
            formattedDate = Utilities.formatDate(row[3], timeZone, "yyyy-MM-dd");
          } else {
            formattedDate = row[3]; // Kekalkan jika bukan format tarikh
          }
          
          // Format Masa (Lajur E)
          let formattedTime = '';
          if (row[4] && row[4] instanceof Date) {
            formattedTime = Utilities.formatDate(row[4], timeZone, "HH:mm");
          } else {
            formattedTime = row[4]; // Kekalkan jika bukan format masa
          }

          return [
            row[0], // Lajur A: Nama
            formattedDate,
            formattedTime
          ];
        });

        // BARIS PENTING DI BAWAH INI
        return ContentService.createTextOutput(JSON.stringify(records.reverse())) // .reverse() untuk tunjuk yang terbaru dahulu
          .setMimeType(ContentService.MimeType.JSON)
          .withHeaders({'Access-Control-Allow-Origin': '*'}); // <-- WAJIB ADA INI

      } catch (err) {
        // BARIS PENTING DI BAWAH INI JUGA
        return ContentService.createTextOutput(JSON.stringify({error: err.message}))
          .setMimeType(ContentService.MimeType.JSON)
          .withHeaders({'Access-Control-Allow-Origin': '*'}); // <-- WAJIB ADA INI
      }
    }

    INGAT: Selepas menukar skrip, anda WAJIB DEPLOY SEMULA (Deploy > New deployment).
    ========================================================================================================================
  */
  const MEMBERS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwB6gkWG84xBvxXrGb9zPwq0_MCezWHouUN4KtZ9imJYqC2NIzONzM7sdYIFkB6ZOn/exec';

  useEffect(() => {
    fetch(MEMBERS_SCRIPT_URL)
      .then(response => {
        if (!response.ok) throw new Error('Gagal mendapatkan data. Semak URL skrip dan kebenaran akses.');
        return response.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        if (!Array.isArray(data)) throw new Error('Format data tidak dijangka diterima daripada skrip.');
        setMembers(data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Kad untuk setiap ahli
  const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
    // Fungsi untuk menukar format masa. Ia kini boleh mengendalikan rentetan tarikh penuh (isu 1899)
    // dan juga rentetan masa biasa (cth: "17:20").
    const formatTime12h = (timeInput: string | Date): string => {
        try {
            // Cuba cipta objek Date. Ini berfungsi untuk rentetan ISO penuh (seperti yang menyebabkan isu '1899')
            // dan juga untuk rentetan masa ringkas seperti "17:20".
            const date = new Date(timeInput);

            // Periksa jika objek Date yang dicipta adalah sah.
            if (isNaN(date.getTime())) {
                // Jika tidak sah, cuba cara manual untuk format "HH:mm"
                if (typeof timeInput === 'string' && timeInput.includes(':')) {
                    const [hours, minutes] = timeInput.split(':');
                    const manualDate = new Date();
                    manualDate.setHours(parseInt(hours, 10));
                    manualDate.setMinutes(parseInt(minutes, 10));
                    if (isNaN(manualDate.getTime())) return timeInput.toString(); // Gagal, pulangkan asal
                    return manualDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });
                }
                return timeInput.toString(); // Gagal semua, pulangkan nilai asal
            }

            // Jika berjaya, formatkan masa ke format 12-jam AM/PM
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            // Jika terdapat sebarang ralat yang tidak dijangka, pulangkan input asal
            return String(timeInput);
        }
    };

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <p className="text-lg font-semibold text-slate-800 mb-3">{member[0]}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-slate-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(member[1]).toLocaleDateString('ms-MY', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTime12h(member[2])}</span>
            </div>
          </div>
        </div>
    );
  };

  // Animasi 'skeleton' semasa memuatkan data
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

  // Paparan jika tiada data
  const EmptyState = () => (
    <div className="text-center py-20 px-6 bg-slate-100/50 rounded-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="mt-4 text-xl font-semibold text-slate-700">Tiada Pendaftaran Ditemui</h3>
      <p className="mt-1 text-sm text-slate-500">Jadilah orang pertama yang mendaftar dan nama anda akan dipaparkan di sini.</p>
    </div>
  );
  
  const renderContent = () => {
    if (isLoading) {
      return <MemberSkeletonLoader />;
    }
    if (error) {
      return <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>;
    }
    if (members.length === 0) {
      return <EmptyState />;
    }
    return (
      <div className="space-y-4">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
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
        <p className="text-slate-500 mt-2">Temujanji yang telah disahkan.</p>
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
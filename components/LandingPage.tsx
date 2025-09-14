import React from 'react';

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

export default LandingPage;
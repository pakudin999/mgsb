import React, { useState } from 'react';
import type { Page } from './types.ts';
import LandingPage from './components/LandingPage.tsx';
import CalculatorPage from './components/CalculatorPage.tsx';

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

export default App;

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import WishPage from './components/WishPage';
import LetterPage from './components/LetterPage';
import NicknamePage from './components/NicknamePage';
import GalleryPage from './components/GalleryPage';
import FinalPage from './components/FinalPage';
import FinalLetterPage from './components/FinalLetterPage';
import DetailedLetterPage from './components/DetailedLetterPage';
import CollagePage from './components/CollagePage';
import SpecialImagePage from './components/SpecialImagePage';
import QuotePage from './components/QuotePage';
import WrapUpPage from './components/WrapUpPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'wish' | 'letter' | 'nickname' | 'gallery' | 'final' | 'final-letter' | 'detailed-letter' | 'collage' | 'special-image' | 'quote' | 'wrap-up'>('landing');

  return (
    <div className="min-h-screen bg-rose-50 overflow-x-hidden overflow-y-auto relative">
      {currentPage === 'landing' && (
        <LandingPage onNext={() => setCurrentPage('wish')} />
      )}
      {currentPage === 'wish' && (
        <WishPage onNext={() => setCurrentPage('letter')} />
      )}
      {currentPage === 'letter' && (
        <LetterPage onNext={() => setCurrentPage('nickname')} />
      )}
      {currentPage === 'nickname' && (
        <NicknamePage onNext={() => setCurrentPage('gallery')} />
      )}
      {currentPage === 'gallery' && (
        <GalleryPage onNext={() => setCurrentPage('final')} />
      )}
      {currentPage === 'final' && (
        <FinalPage onNext={() => setCurrentPage('final-letter')} />
      )}
      {currentPage === 'final-letter' && (
        <FinalLetterPage onNext={() => setCurrentPage('detailed-letter')} />
      )}
      {currentPage === 'detailed-letter' && (
        <DetailedLetterPage onNext={() => setCurrentPage('collage')} />
      )}
      {currentPage === 'collage' && (
        <CollagePage onNext={() => setCurrentPage('special-image')} />
      )}
      {currentPage === 'special-image' && (
        <SpecialImagePage onNext={() => setCurrentPage('quote')} />
      )}
      {currentPage === 'quote' && (
        <QuotePage onNext={() => setCurrentPage('wrap-up')} />
      )}
      {currentPage === 'wrap-up' && (
        <WrapUpPage />
      )}
    </div>
  );
};

export default App;

import React from 'react';
import { ChevronRightIcon } from './icons';

interface PlaceholderViewProps {
  title: string;
  onBack: () => void;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, onBack }) => {
  return (
    <div className="text-center py-20 px-4 min-h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-dk-dark-gray mb-4">صفحه "{title}"</h1>
      <p className="text-lg text-gray-600 mb-8">
        این بخش از وب‌سایت در حال حاضر در دست ساخت است.
      </p>
      <button
        onClick={onBack}
        className="bg-dk-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto"
      >
        <ChevronRightIcon className="w-5 h-5 ml-2" />
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
};

export default PlaceholderView;

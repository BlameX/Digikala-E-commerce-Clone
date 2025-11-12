
import React from 'react';
import { CheckCircleIcon } from './icons';

interface ConfirmationViewProps {
  orderId: string;
  totalPrice: number;
  onBackToHome: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ orderId, totalPrice, onBackToHome }) => {
  return (
    <div className="text-center py-16 max-w-2xl mx-auto">
      <CheckCircleIcon className="w-24 h-24 text-dk-green mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-dk-dark-gray mb-4">خرید شما با موفقیت ثبت شد!</h1>
      <p className="text-lg text-gray-600 mb-2">
        از خرید شما سپاسگزاریم. سفارش شما در حال پردازش است.
      </p>
      <p className="text-gray-500 mb-8">
        شماره پیگیری سفارش شما: <span className="font-mono font-bold text-dk-dark-gray">{orderId}</span>
      </p>
      <div className="bg-dk-light-gray p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
              <span className="text-gray-700">مبلغ کل پرداخت شده:</span>
              <span className="font-bold text-xl text-dk-dark-gray">{totalPrice.toLocaleString('fa-IR')} <span className="text-sm">تومان</span></span>
          </div>
      </div>
      <button
        onClick={onBackToHome}
        className="bg-dk-red text-white font-bold py-3 px-10 rounded-lg hover:bg-red-700 transition-colors"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
};

export default ConfirmationView;

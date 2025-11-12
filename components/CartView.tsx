
import React from 'react';
import { CartItem } from '../types';
import { TrashIcon } from './icons';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, onUpdateQuantity, onRemoveItem, onContinueShopping, onCheckout }) => {
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.discountPrice ?? item.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8" dir="rtl">
      <h1 className="text-2xl lg:text-3xl font-bold text-dk-dark-gray mb-6 border-b pb-4">سبد خرید شما</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 mb-4">سبد خرید شما خالی است.</p>
          <button 
            onClick={onContinueShopping} 
            className="bg-dk-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors"
          >
            ادامه خرید
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center bg-white border rounded-lg p-4 gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain rounded-md" />
                <div className="flex-1">
                  <h2 className="font-semibold text-dk-dark-gray">{item.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded-md">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold text-lg text-dk-red">+</button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-bold text-lg text-dk-red">-</button>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-dk-red">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-left">
                    <p className="font-bold text-dk-dark-gray">
                        {(item.discountPrice ?? item.price).toLocaleString('fa-IR')} <span className="text-xs">تومان</span>
                    </p>
                    {item.discountPrice && (
                        <p className="text-gray-400 line-through text-sm">
                            {item.price.toLocaleString('fa-IR')}
                        </p>
                    )}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-dk-light-gray rounded-lg p-6 sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">جمع کل سبد خرید</span>
                <span className="font-bold text-xl text-dk-dark-gray">{totalPrice.toLocaleString('fa-IR')} <span className="text-sm">تومان</span></span>
              </div>
              <p className="text-xs text-gray-500 mb-6">
                هزینه ارسال بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و در مرحله بعد نمایش داده خواهد شد.
              </p>
              <button 
                onClick={onCheckout}
                className="w-full bg-dk-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                ادامه فرآیند خرید
              </button>
               <button 
                onClick={onContinueShopping} 
                className="w-full bg-transparent text-dk-red font-semibold py-3 mt-3"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;

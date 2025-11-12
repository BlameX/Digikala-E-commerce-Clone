
import React from 'react';
import { Product } from '../types';
import { StarIcon, ChevronRightIcon } from './icons';

interface ProductDetailProps {
    product: Product;
    onBack: () => void;
    onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="mb-4">
          <button onClick={onBack} className="text-sm text-gray-600 hover:text-dk-dark-gray flex items-center">
              <ChevronRightIcon className="w-5 h-5 ml-1 transform" />
              بازگشت به لیست محصولات
          </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4">
            <img src={product.imageUrl} alt={product.name} className="max-w-full h-auto max-h-96 object-contain" />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-dk-dark-gray mb-4">{product.name}</h1>
          
          {product.rating && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span>{product.rating}</span>
            </div>
          )}
          
          <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">توضیحات</h2>
              <p className="text-gray-600 leading-relaxed">
                  {product.description || 'توضیحات این محصول هنوز اضافه نشده است.'}
              </p>
          </div>

          <div className="bg-dk-light-gray p-4 rounded-lg">
             <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-dk-dark-gray">قیمت:</span>
                <div>
                  {product.discountPrice ? (
                     <div className="flex flex-col items-end">
                       <div className="flex items-center gap-2">
                          <span className="bg-dk-red text-white text-sm font-bold rounded-full px-2 py-1">
                            {product.discountPercentage}%
                          </span>
                          <span className="text-xl text-dk-dark-gray font-bold">
                              {product.discountPrice?.toLocaleString('fa-IR')} <span className="text-sm font-normal">تومان</span>
                          </span>
                       </div>
                       <span className="text-gray-400 line-through text-sm mt-1">
                           {product.price.toLocaleString('fa-IR')}
                       </span>
                     </div>
                  ) : (
                    <span className="text-xl text-dk-dark-gray font-bold">
                        {product.price.toLocaleString('fa-IR')} <span className="text-sm font-normal">تومان</span>
                    </span>
                  )}
                </div>
            </div>
            <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-dk-red text-white font-bold py-3 rounded-lg mt-4 hover:bg-red-700 transition-colors"
            >
                افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

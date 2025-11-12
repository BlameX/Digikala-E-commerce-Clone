
import React from 'react';
import { Product } from '../types';
import { ChevronRightIcon, StarIcon } from './icons';

interface CategoryViewProps {
  categoryName: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ categoryName, products, onProductClick, onBack }) => {
  return (
    <div className="py-8">
      {/* Breadcrumbs and Title */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
            <nav className="text-sm flex items-center gap-2 text-gray-500">
                <button onClick={onBack} className="hover:text-dk-red">صفحه اصلی</button>
                <ChevronRightIcon className="w-4 h-4 transform rotate-180" />
                <span>{categoryName}</span>
            </nav>
            <h1 className="text-2xl font-bold text-dk-dark-gray mt-2">
                {categoryName}
            </h1>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-16">
            <p className="text-xl text-gray-500">محصولی در این دسته یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map(product => (
                <button 
                    key={product.id}
                    onClick={() => onProductClick(product)}
                    className="border rounded-lg p-3 text-right hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                    <div>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain mx-auto" />
                        <div className="mt-2 text-sm font-medium h-12 overflow-hidden text-gray-700">{product.name}</div>
                    </div>
                    <div>
                        <div className="flex justify-end items-center mt-2">
                        {product.rating && (
                            <div className="flex items-center gap-1">
                            <span className="text-xs">{product.rating}</span>
                            <StarIcon className="h-4 w-4 text-yellow-400" />
                            </div>
                        )}
                        </div>
                        <div className="text-left mt-2 h-14 flex flex-col justify-end">
                        {product.discountPrice ? (
                            <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <span className="bg-dk-red text-white text-xs font-bold rounded-full px-2 py-1">
                                    {product.discountPercentage}%
                                </span>
                                <span className="text-gray-800 font-bold text-sm md:text-base">
                                    {product.discountPrice?.toLocaleString('fa-IR')} 
                                </span>
                            </div>
                            <span className="text-gray-400 line-through text-xs mt-1">
                                {product.price.toLocaleString('fa-IR')}
                            </span>
                            </div>
                        ) : (
                            <span className="text-gray-800 font-bold text-sm md:text-base">
                                {product.price.toLocaleString('fa-IR')} <span className="text-xs">تومان</span>
                            </span>
                        )}
                        </div>
                    </div>
                </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryView;

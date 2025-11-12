
import React, { useRef } from 'react';
import { Product } from '../types';
import { ChevronLeftIcon } from './icons';

interface AmazingOffersProps {
  onProductClick: (product: Product) => void;
  products: Product[];
  onShowAll: () => void;
}

const AmazingOffers: React.FC<AmazingOffersProps> = ({ onProductClick, products, onShowAll }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = scrollContainerRef.current;
    if (!slider) return;

    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    hasDragged.current = true;
    const slider = scrollContainerRef.current;
    if (!slider) return;

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 2; // scroll-fast multiplier
    slider.scrollLeft = scrollLeft.current - walk;
  };

  const handleProductClick = (product: Product) => {
    if (hasDragged.current) {
      return; // It was a drag, not a click
    }
    onProductClick(product);
  };

  return (
    <div className="bg-dk-red rounded-2xl p-4 my-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
            <img src="https://www.digikala.com/statics/img/svg/special-offer.svg" alt="Amazing Offers" className="h-20" />
            <p className="text-white text-lg font-bold mt-2">پیشنهاد شگفت‌انگیز</p>
        </div>
        <div 
            className="flex-1 overflow-hidden select-none"
        >
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing" 
            style={{ scrollbarWidth: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUpOrLeave}
            onMouseUp={handleMouseUpOrLeave}
            onMouseMove={handleMouseMove}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg p-2 flex-shrink-0 w-44 text-right"
              >
                <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-contain mx-auto pointer-events-none" />
                <div className="mt-2 text-sm font-medium h-10 overflow-hidden pointer-events-none">{product.name}</div>
                <div className="flex justify-between items-center mt-4 pointer-events-none">
                  <span className="bg-dk-red text-white text-xs font-bold rounded-full px-2 py-1">
                    {product.discountPercentage}%
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-800 font-bold">
                        {product.discountPrice?.toLocaleString('fa-IR')} <span className="text-xs">تومان</span>
                    </span>
                    <span className="text-gray-400 line-through text-xs">
                        {product.price.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onShowAll} className="flex flex-col items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1">
            <div className="border-2 border-white rounded-full p-2">
                <ChevronLeftIcon className="h-6 w-6" />
            </div>
            <span className="mt-2 text-sm font-bold">مشاهده همه</span>
        </button>
      </div>
    </div>
  );
};

export default AmazingOffers;

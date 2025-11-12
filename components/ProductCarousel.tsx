
import React, { useRef } from 'react';
import { Product } from '../types';
import { ChevronLeftIcon, StarIcon } from './icons';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onShowAll: () => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, onProductClick, onShowAll }) => {
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
    <div className="border rounded-2xl p-4 my-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <button onClick={onShowAll} className="text-cyan-500 font-bold text-sm flex items-center gap-1">
          مشاهده همه <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-1 overflow-x-auto pb-4 -mx-4 px-4 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className={`flex-shrink-0 w-48 p-2 text-right ${index !== 0 ? 'border-r' : ''}`}
          >
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-contain mx-auto pointer-events-none" />
            <div className="mt-2 text-sm font-medium h-10 overflow-hidden text-gray-700 pointer-events-none">{product.name}</div>
            <div className="flex justify-end items-center mt-2 pointer-events-none">
              {product.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-xs">{product.rating}</span>
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                </div>
              )}
            </div>
            <div className="text-left mt-2 pointer-events-none">
              {product.discountPrice ? (
                 <div className="flex flex-col items-end">
                   <div className="flex items-center gap-2">
                      <span className="bg-dk-red text-white text-xs font-bold rounded-full px-2 py-1">
                        {product.discountPercentage}%
                      </span>
                      <span className="text-gray-800 font-bold">
                          {product.discountPrice?.toLocaleString('fa-IR')}
                      </span>
                   </div>
                   <span className="text-gray-400 line-through text-xs mt-1">
                       {product.price.toLocaleString('fa-IR')}
                   </span>
                 </div>
              ) : (
                <span className="text-gray-800 font-bold">
                    {product.price.toLocaleString('fa-IR')} <span className="text-xs">تومان</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;

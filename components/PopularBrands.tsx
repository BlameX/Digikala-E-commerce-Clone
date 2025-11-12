import React from 'react';

// Replaced hotlinked images with placeholders to prevent loading errors.
const brands = Array.from({ length: 9 }).map((_, i) => ({
  url: `https://picsum.photos/seed/brand${i}/100/100?grayscale`,
  name: `برند ${i + 1}`
}));


const PopularBrands: React.FC = () => {
  return (
    <div className="border rounded-2xl p-4 my-6">
      <div className="flex justify-center items-center mb-2">
        <h3 className="text-lg font-bold">محبوب‌ترین برندها</h3>
      </div>
      <div className="flex items-center">
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-4 overflow-x-auto justify-around" style={{ scrollbarWidth: 'none' }}>
            {brands.map((brand, index) => (
              <a 
                href="#" 
                key={index} 
                className="flex flex-col items-center gap-3 flex-shrink-0 w-28 text-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-dk-red" 
                title={brand.name}
              >
                <div className="h-24 w-24 border rounded-full hover:shadow-md transition-shadow overflow-hidden group">
                    <img 
                      src={brand.url} 
                      alt={brand.name} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                </div>
                <span className="text-xs font-medium text-dk-dark-gray">{brand.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularBrands;

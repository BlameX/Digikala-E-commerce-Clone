
import React from 'react';

const banners = [
    { img: "https://picsum.photos/seed/cat1/300/200" },
    { img: "https://picsum.photos/seed/cat2/300/200" },
    { img: "https://picsum.photos/seed/cat3/300/200" },
    { img: "https://picsum.photos/seed/cat4/300/200" },
    { img: "https://picsum.photos/seed/cat5/300/200" },
    { img: "https://picsum.photos/seed/cat6/300/200" },
    { img: "https://picsum.photos/seed/cat7/300/200" },
    { img: "https://picsum.photos/seed/cat8/300/200" },
];

interface CategoryBannersProps {
    onCategoryClick: (categoryTitle: string) => void;
    categoryTitles: string[];
}

const CategoryBanners: React.FC<CategoryBannersProps> = ({ onCategoryClick, categoryTitles }) => {
    return (
        <div className="my-8">
            <h3 className="text-center text-xl font-bold mb-4">خرید بر اساس دسته‌بندی</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {banners.map((banner, index) => {
                    const title = categoryTitles[index] || `دسته ${index + 1}`;
                    return (
                        <button
                            key={index}
                            onClick={() => onCategoryClick(title)}
                            className="flex flex-col items-center gap-2 text-center transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dk-red rounded-lg p-1 group"
                            aria-label={`دسته بندی ${title}`}
                        >
                            <img src={banner.img} alt={title} className="w-full h-auto object-cover rounded-full aspect-square group-hover:scale-105 group-hover:opacity-80 transition-all duration-300" />
                            <span className="font-medium text-sm text-dk-dark-gray">{title}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default CategoryBanners;

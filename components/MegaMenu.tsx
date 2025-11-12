
import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { ChevronLeftIcon } from './icons';

interface MegaMenuProps {
    categories: Category[];
    onCategorySelect: (category: string) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ categories, onCategorySelect }) => {
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    
    useEffect(() => {
        // Set the first category as active by default when the component mounts or categories change
        if (categories.length > 0) {
            setActiveCategory(categories[0]);
        }
    }, [categories]);

    return (
        <div 
            className="absolute top-full right-0 w-[800px] bg-white border rounded-b-lg shadow-lg z-20 flex"
            dir="rtl"
        >
            {/* Main Categories Panel */}
            <div className="w-1/3 border-l overflow-y-auto">
                <ul>
                    {categories.map((category) => (
                        <li key={category.name}>
                            <button
                                onMouseEnter={() => setActiveCategory(category)}
                                className={`w-full text-right flex items-center p-3 text-sm font-medium transition-colors ${
                                    activeCategory?.name === category.name 
                                    ? 'bg-dk-light-gray text-dk-red' 
                                    : 'hover:bg-gray-50'
                                }`}
                            >
                                {category.icon}
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sub-Categories Panel */}
            <div className="w-2/3 p-4">
                {activeCategory && (
                    <div>
                        <button 
                            onClick={() => onCategorySelect(activeCategory.name)}
                            className="flex items-center text-sm font-bold text-dk-dark-gray mb-4 hover:text-dk-red"
                        >
                           همه کالاهای دسته {activeCategory.name}
                           <ChevronLeftIcon className="w-4 h-4 mr-1" />
                        </button>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {activeCategory.subcategories.map((sub) => (
                                <li key={sub.name}>
                                    <button 
                                        onClick={() => onCategorySelect(sub.name)}
                                        className="text-right w-full p-2 hover:text-dk-red rounded-md text-gray-600 text-sm"
                                    >
                                        {sub.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MegaMenu;

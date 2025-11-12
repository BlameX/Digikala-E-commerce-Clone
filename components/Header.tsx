
import React, { useState } from 'react';
import { SearchIcon, CartIcon, UserIcon, MenuIcon, LocationIcon } from './icons';
import MegaMenu from './MegaMenu';
import { Category, User } from '../types';

interface HeaderProps {
    onCategoryClick: (category: string) => void;
    categories: Category[];
    cartItemCount: number;
    onShowCart: () => void;
    currentUser: User | null;
    onLoginClick: () => void;
    onLogout: () => void;
    onShowAmazingOffers: () => void;
    onShowSupermarket: () => void;
    onShowBestSellers: () => void;
    onShowPlaceholder: (title: string) => void;
    onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    onCategoryClick, 
    categories, 
    cartItemCount, 
    onShowCart,
    currentUser,
    onLoginClick,
    onLogout,
    onShowAmazingOffers,
    onShowSupermarket,
    onShowBestSellers,
    onShowPlaceholder,
    onGoHome
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleCategorySelect = (category: string) => {
        onCategoryClick(category);
        setIsMenuOpen(false); // Close menu on selection
    };

    return (
        <header className="border-b">
            <div className="max-w-screen-2xl mx-auto">
                <button onClick={() => onShowPlaceholder('تبلیغ بالای صفحه')} className="block w-full">
                    <img src="https://picsum.photos/1280/60?grayscale" alt="Top Banner Ad" className="w-full h-15 object-cover" />
                </button>
            </div>
            <div className="max-w-screen-2xl mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-6">
                        <button onClick={onGoHome} aria-label="صفحه اصلی دیجی‌کالا">
                            <img src="https://www.digikala.com/statics/img/svg/logo.svg" alt="Digikala Logo" className="h-8" />
                        </button>
                        <div className="relative w-96 hidden lg:block">
                            <input
                                type="text"
                                placeholder="جستجو"
                                className="w-full bg-dk-light-gray rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none"
                            />
                            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {currentUser ? (
                             <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
                                    className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm text-dk-dark-gray"
                                >
                                    <UserIcon className="h-5 w-5" />
                                    حساب کاربری
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20 text-right">
                                        <div className="p-3 border-b text-sm text-gray-600 truncate" title={currentUser.email}>{currentUser.email}</div>
                                        <button 
                                            onClick={onLogout} 
                                            className="w-full text-right px-4 py-2 text-sm text-dk-red hover:bg-red-50"
                                        >
                                            خروج از حساب
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={onLoginClick} className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm text-dk-dark-gray hover:bg-gray-50 transition-colors">
                                <UserIcon className="h-5 w-5" />
                                ورود | ثبت‌نام
                            </button>
                        )}

                        <span className="text-gray-300">|</span>
                        <button onClick={onShowCart} className="relative text-dk-dark-gray hover:text-dk-red transition-colors">
                            <CartIcon className="h-6 w-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-dk-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between pb-2 text-sm text-gray-600">
                    <div className="flex items-center gap-6 relative" onMouseLeave={() => setIsMenuOpen(false)}>
                        <button 
                            className="flex items-center gap-2 font-bold"
                            onMouseEnter={() => setIsMenuOpen(true)}
                        >
                            <MenuIcon className="h-5 w-5" />
                            دسته‌بندی کالاها
                        </button>
                        {isMenuOpen && (
                            <MegaMenu 
                                categories={categories}
                                onCategorySelect={handleCategorySelect}
                            />
                        )}
                        <span className="text-gray-200 hidden lg:block">|</span>
                        <nav className="hidden lg:flex items-center gap-4">
                            <button onClick={onShowAmazingOffers} className="hover:text-dk-red">شگفت‌انگیزها</button>
                            <button onClick={onShowSupermarket} className="hover:text-dk-red">سوپرمارکت</button>
                            <button onClick={() => onShowPlaceholder('کارت هدیه')} className="hover:text-dk-red">کارت هدیه</button>
                            <button onClick={onShowBestSellers} className="hover:text-dk-red">پرفروش‌ترین‌ها</button>
                        </nav>
                    </div>
                    <button onClick={() => onShowPlaceholder('انتخاب شهر')} className="flex items-center gap-2">
                        <LocationIcon className="h-5 w-5" />
                        لطفا شهر خود را انتخاب کنید
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

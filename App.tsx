
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import MainCarousel from './components/MainCarousel';
import QuickAccess from './components/QuickAccess';
import AmazingOffers from './components/AmazingOffers';
import CategoryBanners from './components/CategoryBanners';
import ProductCarousel from './components/ProductCarousel';
import PopularBrands from './components/PopularBrands';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import CategoryView from './components/CategoryView';
import ConfirmationView from './components/ConfirmationView';
import PlaceholderView from './components/PlaceholderView';
import { Product, Category, CartItem, User } from './types';
import { getCurrentUser, logout } from './services/authService';
import AuthModal from './components/AuthModal';
import { 
    LaptopIcon, 
    HomeApplianceIcon, 
    FashionIcon, 
    SupermarketIcon,
    BookIcon,
    ToyIcon,
    HealthIcon,
    SportIcon,
    CarIcon
} from './components/icons';

const hierarchicalCategories: Category[] = [
  { 
    name: 'کالای دیجیتال', 
    icon: <LaptopIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'گوشی موبایل' }, { name: 'لپ تاپ' }, { name: 'کامپیوتر و قطعات' }, 
      { name: 'دوربین' }, { name: 'کنسول بازی' }, { name: 'لوازم جانبی' }
    ]
  },
  { 
    name: 'لوازم خانگی', 
    icon: <HomeApplianceIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'یخچال و فریزر' }, { name: 'ماشین لباسشویی' }, { name: 'تلویزیون' }, 
      { name: 'لوازم پخت و پز' }, { name: 'تهویه مطبوع' }
    ]
  },
  { 
    name: 'مد و پوشاک', 
    icon: <FashionIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'لباس زنانه' }, { name: 'لباس مردانه' }, { name: 'کیف و کفش' }, 
      { name: 'اکسسوری' }, { name: 'لباس بچه گانه' }
    ]
  },
  { 
    name: 'کالاهای سوپرمارکتی', 
    icon: <SupermarketIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'لبنیات' }, { name: 'نوشیدنی' }, { name: 'تنقلات' }, 
      { name: 'مواد پروتئینی' }, { name: 'صبحانه' }
    ]
  },
  { 
    name: 'کتاب و لوازم تحریر', 
    icon: <BookIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'کتاب و مجله' }, { name: 'نوشت افزار' }, { name: 'لوازم اداری' }, 
      { name: 'هنرهای تجسمی' }
    ]
  },
   { 
    name: 'اسباب بازی و کودک', 
    icon: <ToyIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'اسباب بازی' }, { name: 'بهداشت و حمام کودک' }, { name: 'پوشاک و کفش بچه' }, 
      { name: 'لوازم شخصی کودک' }
    ]
  },
  { 
    name: 'زیبایی و سلامت', 
    icon: <HealthIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'لوازم آرایشی' }, { name: 'مراقبت پوست' }, { name: 'عطر و ادکلن' }, 
      { name: 'لوازم بهداشتی' }, { name: 'ابزار سلامت' }
    ]
  },
  { 
    name: 'ورزش و سفر', 
    icon: <SportIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'پوشاک ورزشی' }, { name: 'تجهیزات سفر' }, { name: 'لوازم کوهنوردی' }, 
      { name: 'دوچرخه' }, { name: 'تجهیزات ورزشی' }
    ]
  },
    { 
    name: 'خودرو و ابزار', 
    icon: <CarIcon className="w-5 h-5 ml-2" />,
    subcategories: [
      { name: 'لوازم یدکی خودرو' }, { name: 'ابزار برقی' }, { name: 'ابزار دستی' }, 
      { name: 'لوازم نظافت خودرو' }
    ]
  },
];

const allSubCategories = hierarchicalCategories.flatMap(cat => cat.subcategories.map(sub => sub.name));

const allProducts: Product[] = Array.from({ length: 120 }).map((_, i) => {
    const subCategoryName = allSubCategories[i % allSubCategories.length];
    const mainCategory = hierarchicalCategories.find(cat => cat.subcategories.some(sub => sub.name === subCategoryName));
    const name = `کالای دسته ${subCategoryName} شماره ${Math.floor(i / allSubCategories.length) + 1}`;
    
    return {
        id: i + 100,
        name: name,
        imageUrl: `https://picsum.photos/seed/${i + 100}/400/400`,
        price: Math.floor(Math.random() * 500000) + 100000,
        discountPrice: i % 4 === 0 ? Math.floor(Math.random() * 90000) + 10000 : undefined,
        discountPercentage: i % 4 === 0 ? Math.floor(Math.random() * 20) + 10 : undefined,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        category: subCategoryName,
        description: `این یک توضیح نمونه برای ${name} است. این محصول دارای ویژگی‌های منحصر به فردی است که تجربه کاربری فوق‌العاده‌ای را برای شما به ارمغان می‌آورد. ساخته شده از بهترین مواد اولیه و با دقت فراوان.`,
    };
});

const mockAmazingProducts: Product[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 21,
  name: `کالای شگفت‌انگیز ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${i + 21}/150/150`,
  price: Math.floor(Math.random() * 500000) + 100000,
  discountPrice: Math.floor(Math.random() * 90000) + 10000,
  discountPercentage: Math.floor(Math.random() * 30) + 20,
  category: 'پیشنهاد شگفت‌انگیز',
  description: 'توضیحات برای کالای شگفت انگیز.',
  rating: (Math.random() * 1.5 + 3.5).toFixed(1),
}));

const mockDigiPlusProducts: Product[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 11,
    name: `کالای دیجی پلاس ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${i + 11}/200/200`,
    price: Math.floor(Math.random() * 1000000) + 200000,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    category: 'DigiPlus',
    description: 'توضیحات برای کالای دیجی پلاس.',
}));

const App: React.FC = () => {
  type ViewType = 'home' | 'product' | 'cart' | 'listView' | 'confirmation' | 'placeholder';
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [listViewData, setListViewData] = useState<{ title: string; products: Product[] }>({ title: '', products: [] });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [lastOrder, setLastOrder] = useState<{ id: string; total: number } | null>(null);
  const [placeholderTitle, setPlaceholderTitle] = useState<string>('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const showListView = (title: string, products: Product[]) => {
    setListViewData({ title, products });
    setCurrentView('listView');
    setSelectedProduct(null);
  };
  
  const handleShowPlaceholder = (title: string) => {
    setPlaceholderTitle(title);
    setCurrentView('placeholder');
  };

  const handleCategoryClick = (categoryName: string) => {
    const mainCategory = hierarchicalCategories.find(c => c.name === categoryName);
    let productsToShow: Product[];
    
    if (mainCategory) {
        const subCategoryNames = mainCategory.subcategories.map(s => s.name);
        productsToShow = allProducts.filter(p => subCategoryNames.includes(p.category));
    } else {
        productsToShow = allProducts.filter(p => p.category === categoryName);
    }
    
    showListView(categoryName, productsToShow);
  };

  const homeProducts = useMemo(() => {
    return allProducts.slice(0, 10);
  }, []);
  
  const handleQuickAccessClick = (itemName: string) => {
      switch (itemName) {
          case 'دیجی‌کالا جت':
              handleCategoryClick('کالاهای سوپرمارکتی');
              break;
          case 'حراج استایل':
              handleCategoryClick('مد و پوشاک');
              break;
          case 'دیجی‌پلاس':
              showListView('منتخب محصولات دیجی‌پلاس', mockDigiPlusProducts);
              break;
          case 'کالاهای بیشتر':
              handleShowPlaceholder('بیشتر');
              break;
          default:
              handleShowPlaceholder(itemName);
              return;
      }
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setCurrentView('home');
  };

  const handleShowCart = () => {
    setCurrentView('cart');
  };

  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
    alert(`${productToAdd.name} به سبد خرید اضافه شد!`);
  };

  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
    const handleCheckout = () => {
        if (cart.length === 0) return;
        const totalPrice = cart.reduce((total, item) => {
            const price = item.discountPrice ?? item.price;
            return total + price * item.quantity;
        }, 0);
        const orderId = `DKC-${Date.now()}`;
        
        setLastOrder({ id: orderId, total: totalPrice });
        setCart([]);
        setCurrentView('confirmation');
    };

  const categoryBannerTitles = hierarchicalCategories.map(c => c.name).slice(0, 8);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const renderView = () => {
    switch(currentView) {
      case 'product':
        return selectedProduct && <ProductDetail product={selectedProduct} onBack={() => { setCurrentView('listView') }} onAddToCart={handleAddToCart} />;
      case 'cart':
        return <CartView cartItems={cart} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onContinueShopping={handleBackToHome} onCheckout={handleCheckout} />;
      case 'listView':
        return (
            <CategoryView
                categoryName={listViewData.title}
                products={listViewData.products}
                onProductClick={handleProductClick}
                onBack={handleBackToHome}
            />
        );
       case 'confirmation':
        return lastOrder && <ConfirmationView orderId={lastOrder.id} totalPrice={lastOrder.total} onBackToHome={handleBackToHome} />;
       case 'placeholder':
        return <PlaceholderView title={placeholderTitle} onBack={handleBackToHome} />;
      case 'home':
      default:
        return (
          <>
            <MainCarousel />
            <QuickAccess onQuickAccessClick={handleQuickAccessClick} />
            <AmazingOffers 
                onProductClick={handleProductClick} 
                products={mockAmazingProducts} 
                onShowAll={() => showListView('پیشنهاد شگفت‌انگیز', mockAmazingProducts)}
            />
            <CategoryBanners onCategoryClick={handleCategoryClick} categoryTitles={categoryBannerTitles} />

            <ProductCarousel 
              title="پرفروش‌ترین کالاها" 
              products={homeProducts} 
              onProductClick={handleProductClick}
              onShowAll={() => showListView('پرفروش‌ترین کالاها', homeProducts)}
            />
            <ProductCarousel 
              title="منتخب محصولات دیجی‌پلاس" 
              products={mockDigiPlusProducts} 
              onProductClick={handleProductClick}
              onShowAll={() => showListView('منتخب محصولات دیجی‌پلاس', mockDigiPlusProducts)}
            />
            <PopularBrands />
          </>
        );
    }
  };

  return (
    <div className="bg-white font-sans text-right" dir="rtl">
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onAuthSuccess={handleAuthSuccess} 
        />
      )}
      <Header 
        onCategoryClick={handleCategoryClick} 
        categories={hierarchicalCategories}
        cartItemCount={cartItemCount}
        onShowCart={handleShowCart}
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onShowAmazingOffers={() => showListView('پیشنهاد شگفت‌انگیز', mockAmazingProducts)}
        onShowSupermarket={() => handleCategoryClick('کالاهای سوپرمارکتی')}
        onShowBestSellers={() => showListView('پرفروش‌ترین کالاها', homeProducts)}
        onShowPlaceholder={handleShowPlaceholder}
        onGoHome={handleBackToHome}
      />
      <main className="max-w-screen-2xl mx-auto px-4">
        {renderView()}
      </main>
      <Footer onShowPlaceholder={handleShowPlaceholder} />
      <Chatbot />
    </div>
  );
};

export default App;

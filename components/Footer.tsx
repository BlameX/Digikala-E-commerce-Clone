import React from 'react';
import { InstagramIcon, TwitterIcon, LinkedinIcon, AparatIcon } from './icons';

interface FooterProps {
    onShowPlaceholder: (title: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onShowPlaceholder }) => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <img src="https://www.digikala.com/statics/img/svg/logo.svg" alt="Digikala Logo" className="h-8" />
          <a href="#root" className="text-sm bg-dk-light-gray rounded-lg px-4 py-2">بازگشت به بالا</a>
        </div>
        <div className="text-sm text-gray-500 my-4">
          <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
          <span className="mx-2">|</span>
          <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b">
          <div>
            <h4 className="font-bold text-gray-800 mb-4">با دیجی‌کالا</h4>
            <ul className="space-y-3 text-gray-600">
              <li><button onClick={() => onShowPlaceholder('اتاق خبر دیجی‌کالا')} className="hover:text-dk-red text-right">اتاق خبر دیجی‌کالا</button></li>
              <li><button onClick={() => onShowPlaceholder('فروش در دیجی‌کالا')} className="hover:text-dk-red text-right">فروش در دیجی‌کالا</button></li>
              <li><button onClick={() => onShowPlaceholder('فرصت‌های شغلی')} className="hover:text-dk-red text-right">فرصت‌های شغلی</button></li>
              <li><button onClick={() => onShowPlaceholder('تماس با دیجی‌کالا')} className="hover:text-dk-red text-right">تماس با دیجی‌کالا</button></li>
              <li><button onClick={() => onShowPlaceholder('درباره دیجی‌کالا')} className="hover:text-dk-red text-right">درباره دیجی‌کالا</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">خدمات مشتریان</h4>
            <ul className="space-y-3 text-gray-600">
              <li><button onClick={() => onShowPlaceholder('پاسخ به پرسش‌های متداول')} className="hover:text-dk-red text-right">پاسخ به پرسش‌های متداول</button></li>
              <li><button onClick={() => onShowPlaceholder('رویه‌های بازگرداندن کالا')} className="hover:text-dk-red text-right">رویه‌های بازگرداندن کالا</button></li>
              <li><button onClick={() => onShowPlaceholder('شرایط استفاده')} className="hover:text-dk-red text-right">شرایط استفاده</button></li>
              <li><button onClick={() => onShowPlaceholder('حریم خصوصی')} className="hover:text-dk-red text-right">حریم خصوصی</button></li>
              <li><button onClick={() => onShowPlaceholder('گزارش باگ')} className="hover:text-dk-red text-right">گزارش باگ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">راهنمای خرید از دیجی‌کالا</h4>
            <ul className="space-y-3 text-gray-600">
              <li><button onClick={() => onShowPlaceholder('نحوه ثبت سفارش')} className="hover:text-dk-red text-right">نحوه ثبت سفارش</button></li>
              <li><button onClick={() => onShowPlaceholder('رویه ارسال سفارش')} className="hover:text-dk-red text-right">رویه ارسال سفارش</button></li>
              <li><button onClick={() => onShowPlaceholder('شیوه‌های پرداخت')} className="hover:text-dk-red text-right">شیوه‌های پرداخت</button></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-gray-800 mb-4">همراه ما باشید!</h4>
             <div className="flex items-center gap-6">
                <a href="https://www.instagram.com/digikalacom/" target="_blank" rel="noopener noreferrer" aria-label="Digikala on Instagram"><InstagramIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" /></a>
                <a href="https://twitter.com/digikalacom" target="_blank" rel="noopener noreferrer" aria-label="Digikala on Twitter"><TwitterIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" /></a>
                <a href="https://www.linkedin.com/company/digikala/" target="_blank" rel="noopener noreferrer" aria-label="Digikala on LinkedIn"><LinkedinIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" /></a>
                <a href="https://www.aparat.com/digikala" target="_blank" rel="noopener noreferrer" aria-label="Digikala on Aparat"><AparatIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" /></a>
             </div>
             <div className="mt-6">
                <h5 className="font-bold text-gray-800 mb-2">با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید</h5>
                <form onSubmit={(e) => { e.preventDefault(); alert('ایمیل شما با موفقیت ثبت شد!'); }}>
                    <div className="flex">
                        <input type="email" placeholder="ایمیل شما" className="bg-dk-light-gray rounded-r-lg p-2 flex-1 focus:outline-none text-sm" required />
                        <button type="submit" className="bg-gray-300 text-gray-600 px-4 rounded-l-lg hover:bg-gray-400">ثبت</button>
                    </div>
                </form>
             </div>
          </div>
        </div>
         <div className="flex flex-col md:flex-row justify-between items-center py-4 bg-dk-dark-gray text-white rounded-lg px-6 my-6">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
                <img src="https://www.digikala.com/statics/img/svg/footer-logo.svg" alt="Digikala App" className="w-12 h-12" />
                <span className="font-bold">دانلود اپلیکیشن دیجی‌کالا</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a href="https://play.google.com/store/apps/details?id=com.digikala&hl=fa&gl=US" target="_blank" rel="noopener noreferrer"><img src="https://www.digikala.com/statics/img/svg/app-store-badge/google-play-light.svg" alt="Google Play" className="h-12"/></a>
                <a href="https://cafebazaar.ir/app/com.digikala" target="_blank" rel="noopener noreferrer"><img src="https://www.digikala.com/statics/img/svg/app-store-badge/coffe-bazaar-light.svg" alt="Bazaar" className="h-12"/></a>
                <a href="https://myket.ir/app/com.digikala" target="_blank" rel="noopener noreferrer"><img src="https://www.digikala.com/statics/img/svg/app-store-badge/myket-light.svg" alt="Myket" className="h-12"/></a>
                <a href="https://sibapp.com/applications/digikala" target="_blank" rel="noopener noreferrer"><img src="https://www.digikala.com/statics/img/svg/app-store-badge/sib-app-light.svg" alt="Sib App" className="h-12"/></a>
            </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-gray-500 text-sm pt-6">
            <p className="mt-4 md:mt-0">برای استفاده از مطالب دیجی‌کالا، ذکر «منبع» همراه با «لینک» کافیست.</p>
            <div className="flex items-center gap-2">
              <a href="https://enamad.ir/" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-lg"><img src="https://www.digikala.com/statics/img/png/rezi.png" alt="E-Namad" className="h-16 w-auto" /></a>
              <a href="https://ecunion.ir/" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-lg"><img src="https://www.digikala.com/statics/img/png/kasbokar.png" alt="Kasbokar" className="h-16 w-auto" /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

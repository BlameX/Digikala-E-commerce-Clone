import React, { useState } from 'react';
import { login, signUp } from '../services/authService';
import { User } from '../types';
import { CloseIcon } from './icons';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isLoginView && password !== confirmPassword) {
      setError('رمزهای عبور با هم مطابقت ندارند.');
      return;
    }
    
    setIsLoading(true);

    try {
        const response = isLoginView 
            ? await login(email, password) 
            : await signUp(email, password);

        if (response.user) {
            onAuthSuccess(response.user);
        } else if (response.error) {
            setError(response.error);
        }
    } catch (err) {
        setError('خطایی رخ داد. لطفا دوباره تلاش کنید.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-8 relative"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" aria-label="بستن">
          <CloseIcon className="w-6 h-6" />
        </button>

        <img src="https://www.digikala.com/statics/img/svg/logo.svg" alt="Digikala Logo" className="h-8 mx-auto mb-6" />
        
        <h2 className="text-xl font-bold text-dk-dark-gray mb-2">
            {isLoginView ? 'ورود به حساب کاربری' : 'ثبت‌نام در دیجی‌کالا'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
            {isLoginView ? 'سلام! لطفا ایمیل و رمز عبور خود را وارد کنید.' : 'برای خرید و مشاهده سفارش‌ها، ثبت‌نام کنید.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-right">ایمیل</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-dk-dark-gray text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-dk-red placeholder-gray-400"
              placeholder="example@mail.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1 text-right">رمز عبور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-dk-dark-gray text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-dk-red"
            />
          </div>
          {!isLoginView && (
            <div className="mb-6">
              <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-700 mb-1 text-right">تکرار رمز عبور</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dk-dark-gray text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-dk-red"
              />
            </div>
          )}
          
          {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-dk-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300 mt-2"
          >
            {isLoading ? 'در حال پردازش...' : (isLoginView ? 'ورود' : 'ثبت‌نام')}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="text-dk-red font-semibold text-sm">
            {isLoginView ? 'ثبت نام' : 'ورود'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

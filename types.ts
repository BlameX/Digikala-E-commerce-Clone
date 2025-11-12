// FIX: Import React to use React.ReactNode type.
import React from 'react';

export interface User {
  email: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  discountPrice?: number;
  discountPercentage?: number;
  rating?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'loading';
}

export interface SubCategory {
  name: string;
}

export interface Category {
  name: string;
  icon: React.ReactNode;
  subcategories: SubCategory[];
}

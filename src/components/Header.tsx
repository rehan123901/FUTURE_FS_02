'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const { getTotalItems } = useCartStore();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button className="text-gray-700 hover:text-blue-600">
              <User className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

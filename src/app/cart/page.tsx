'use client';

import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/CartItem';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingBag className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({getTotalItems()})</span>
                <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {getTotalPrice() >= 50 ? 'Free' : '$9.99'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  ${(getTotalPrice() * 0.08).toFixed(2)}
                </span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  ${(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 9.99) + (getTotalPrice() * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Proceed to Checkout</span>
            </Link>

            {getTotalPrice() < 50 && (
              <p className="text-sm text-gray-600 mt-3 text-center">
                Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

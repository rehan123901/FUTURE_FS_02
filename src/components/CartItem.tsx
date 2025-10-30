'use client';

import { CartItem as CartItemType } from '@/types/product';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.product.name}</h3>
        <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="font-medium text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.product.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

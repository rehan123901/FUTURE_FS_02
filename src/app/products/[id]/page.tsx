'use client';

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Star, ArrowLeft, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    // You could add a toast notification here
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link 
        href="/products" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="text-4xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>

            {!product.inStock && (
              <p className="text-red-500 text-sm">This item is currently out of stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

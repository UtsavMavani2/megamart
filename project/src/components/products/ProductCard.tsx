import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0] || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </Link>
        <button 
          className="absolute top-2 left-2 bg-white p-1.5 rounded-full text-gray-600 hover:text-red-500 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-1 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-transparent'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews.length})</span>
        </div>

        <p className="text-lg font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>

        <div className="flex justify-between items-center">
          <Link
            to={`/products/${product._id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            View Details
          </Link>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
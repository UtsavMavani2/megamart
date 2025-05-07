import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search, X, LogOut, LogIn, Home, Package, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">MegaMart</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
            Products
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
            Categories
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
              Admin
            </Link>
          )}
        </nav>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:hidden">
          <div className="fixed right-0 top-0 w-64 h-full bg-white shadow-lg transform transition-transform z-50">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-semibold">Menu</span>
              <button className="text-gray-500" onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="p-4 border-b">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            <nav className="py-2">
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Package className="h-5 w-5 mr-2" />
                Products
              </Link>
              <Link
                to="/categories"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Heart className="h-5 w-5 mr-2" />
                Categories
              </Link>
              <Link
                to="/cart"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5 mr-2" />
                    My Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      <Package className="h-5 w-5 mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
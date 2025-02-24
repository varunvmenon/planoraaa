import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, Search, User } from 'lucide-react';
import { useStore } from '../store';

const Navbar = () => {
  const cartCount = useStore((state) => state.cartItems.length);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Planora-AI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/categories/dresses" className="nav-link">Dresses</Link>
            <Link to="/categories/decorations" className="nav-link">Decorations</Link>
            <Link to="/categories/photography" className="nav-link">Photography</Link>
            <Link to="/venue-analysis" className="nav-link">Venue Analysis</Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <Link to="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-6 h-6 text-gray-600" />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
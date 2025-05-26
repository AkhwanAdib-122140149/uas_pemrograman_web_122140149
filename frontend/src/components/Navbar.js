import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const cartItemCount = useSelector(state => state.cart.items.length);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-green-600">Warung Pecel Lele</Link>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
        <Link to="/keranjang" className="text-gray-700 hover:text-green-600 relative">
          Keranjang
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-green-600">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
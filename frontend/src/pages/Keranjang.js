import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart, 
  clearCart 
} from '../store/cartSlice';

function Keranjang() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Hitung total harga berdasarkan harga * kuantitas
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    // Buat pesan WhatsApp yang lebih detail
    const message = cartItems.map(item => 
      `${item.name} (Rp${item.price}) x ${item.quantity} porsi`
    ).join(',\n');
    const waLink = `https://wa.me/6289514149157?text=Halo%2C%20saya%20mau%20pesan%3A%0A${encodeURIComponent(message)}%0A%0ATotal%20Harga%3A%20Rp${totalPrice}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Keranjang Belanja</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow-md">
          <p className="text-xl mb-4">Keranjang Anda masih kosong.</p>
          <Link to="/" className="text-green-600 hover:text-green-800 font-semibold">
            &larr; Kembali ke Daftar Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daftar Item */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-3">Item Pesanan</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4">
                <div className="flex items-center mb-4 sm:mb-0">
                  <img 
                    src={item.image_url || 'https://via.placeholder.com/100'} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Rp{item.price} / porsi</p>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      Subtotal: Rp{item.price * item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700 text-sm ml-4"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ringkasan Pesanan */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-8">
              <h2 className="text-2xl font-semibold mb-4 border-b pb-3">Ringkasan</h2>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Total Harga:</span>
                <span className="text-2xl font-bold text-green-700">Rp{totalPrice}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Pesan via WhatsApp
              </button>
              <button 
                onClick={() => dispatch(clearCart())}
                className="w-full mt-2 text-sm text-gray-500 hover:text-red-500"
              >
                Kosongkan Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Keranjang;
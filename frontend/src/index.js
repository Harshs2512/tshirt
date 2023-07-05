import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';
import { PaymentProvider } from './context/RazorpayContext';
import { WishlistProvider } from './context/wishlist';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <PaymentProvider>
      <SearchProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter >
              <App />
            </BrowserRouter >
          </CartProvider>
        </WishlistProvider>
      </SearchProvider>
    </PaymentProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

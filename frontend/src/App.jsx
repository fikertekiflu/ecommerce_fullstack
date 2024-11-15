import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';

import Header from './components/Header';
import { Login, Register } from './pages/authpage';
import Userdashboard from './pages/Userdashboard';
import CartPage from './pages/CartPage';
import PaymentConfirmation from './pages/PaymentConfirmation'
// import Footer from './components/Footer';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
           <Route path="/userdashboard" element={<Userdashboard />} />
           <Route path="/cartpage" element={<CartPage />} />
           <Route path="/cart/confirmation" element={<PaymentConfirmation />} />
          </Routes> 
        </main>
      </div>
    </Router>
  );
};

export default App;

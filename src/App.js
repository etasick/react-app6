import React, { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartContext } from './context/CartContext';
import CheckoutPageSuccess from "./pages/CheckoutPageSuccess";
import TrackOrder from './pages/TrackOrder';
import ProductDetails from './components/ProductDetails';
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Shop from "./pages/Shop";
import Homepage from './pages/Homepage';
import CategoryPage from "./pages/CategoryPage";
import Header from './components/Header';
import Footer from './components/Footer';
import { HelmetProvider } from 'react-helmet-async';



function App() {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mx-auto">
      {/* Responsive Header */}
      <Header cart={cart}/>

      {/* Main Content */}
      <main>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkoutpagesuccess" element={<CheckoutPageSuccess />} />
          <Route path="/track_order" element={<TrackOrder />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/category/:id" element={<CategoryPage />} />

        </Routes>
        </HelmetProvider>
      </main>

      {/* Footer */}
      <Footer cart={cart}/>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Chat from './ChatBot/Chat.js';
import Product from './Product/Product.js';
import Services from './Services.js';
import Aboutus from './Aboutus.js';
import Agriheritage from './Agriheritage.js';

function App() {

  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const resetSelectedService = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    // Set default service when the component mounts
    setSelectedService('Home');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-green-700 text-white py-4 px-4 sm:px-8">
        <div className="flex justify-between items-center max-w-screen-lg mx-auto">
          <h1 className="text-lg font-bold cursor-pointer">PlantPro</h1>
          <div className="flex gap-4">
            <h1 className="cursor-pointer hover:underline" onClick={() => handleServiceClick('Home')}>Home</h1>
            <h1 className="cursor-pointer hover:underline" onClick={() => handleServiceClick('Product')}>Product</h1>
            <h1 className="cursor-pointer hover:underline" onClick={() => handleServiceClick('About us')}>About</h1>
          </div>
        </div>
      </nav>

      <div className="bg-green-50 py-16 text-center relative overflow-hidden">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-5xl font-bold text-green-800 mb-8 animate-bounce">PlantPro</h2>
          <p className="text-lg text-gray-600 mb-8 animate-pulse">
            PlantPro is an innovative agricultural project that aims to empower farmers with AI-driven plant insights. By leveraging the power of artificial intelligence, PlantPro provides farmers with valuable information and recommendations to optimize their crop management and enhance overall productivity. Through advanced technologies and machine learning algorithms, PlantPro offers a comprehensive platform for crop classification, disease detection, seed stage identification, yield prediction, and real-time assistance.
          </p>
          <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">"Grow smarter with PlantPro: where AI nurtures crops and empowers farmers."</button>
        </div>
        <p className='text-center py-8'> API services might be down. Apologies for the inconvenience</p>
      </div>

      <div className="bg-green-100 py-16">
        {selectedService === 'Home' && <Chat />}
        {selectedService === 'Home' && <Agriheritage/>}
        {selectedService === 'Home' && <Services/>}
        {selectedService === 'Product' && <Product/>}
        {selectedService === 'About us' && <Aboutus/>}
      </div>

      <footer className="bg-green-800 text-white py-4 px-4 sm:px-8 mt-auto">
        <div className="max-w-screen-lg mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} PlantPro. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;

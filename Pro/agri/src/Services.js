import React, { useState } from 'react';
import ImageClassifier from './Image_Classifier/Image_Classifier.js';
import YieldPrediction from './Yield_Prediction/Yield_Prediction.js';
import SeedStageDetector from './SeedStage/SeedStageDetector.js';
import PlantDisease from './Plant_Disease/Plant_Disease.js';

function Services() {
  const [selectedService, setSelectedService] = useState('Seed Stage Detector');

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    
     <div className="flex max-w-screen-xl mx-auto mt-8">
      {/* Services */}
      <div className="w-1/5 px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Our Cutting-Edge Solutions</h2>
        <div className="flex flex-col space-y-4">
          <div className={`cursor-pointer ${selectedService === 'Crop Classifier' ? 'bg-green-200' : 'hover:bg-green-200'} rounded-lg px-4 py-2 transition duration-300`} onClick={() => handleServiceClick('Crop Classifier')}>Crop Classifier</div>
          <div className={`cursor-pointer ${selectedService === 'Yield Prediction' ? 'bg-green-200' : 'hover:bg-green-200'} rounded-lg px-4 py-2 transition duration-300`} onClick={() => handleServiceClick('Yield Prediction')}>Yield Prediction</div>
          <div className={`cursor-pointer ${selectedService === 'Seed Stage Detector' ? 'bg-green-200' : 'hover:bg-green-200'} rounded-lg px-4 py-2 transition duration-300`} onClick={() => handleServiceClick('Seed Stage Detector')}>Seed Stage Detector</div>
          <div className={`cursor-pointer ${selectedService === 'Plant Disease' ? 'bg-green-200' : 'hover:bg-green-200'} rounded-lg px-4 py-2 transition duration-300`} onClick={() => handleServiceClick('Plant Disease')}>Plant Disease</div>
        </div>
      </div>

      {/* Display Component based on selected service */}
      <div className="w-4/5 px-4">
        {selectedService === 'Seed Stage Detector' && <SeedStageDetector />}
        {selectedService === 'Crop Classifier' && <ImageClassifier />}
        {selectedService === 'Yield Prediction' && <YieldPrediction />}
        {selectedService === 'Plant Disease' && <PlantDisease />}
      </div>
    </div>
  );
}

export default Services;

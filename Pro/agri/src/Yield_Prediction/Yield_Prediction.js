import React, { useState } from 'react';
import axios from 'axios';

function Yield_Prediction() {
  const [formData, setFormData] = useState({
    Crop_Year: '',
    Crop: '',
    State: '',
    Season: '',
    Area: '',
    Production: '',
    Annual_Rainfall: '',
    Fertilizer: '',
    Pesticide: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://fastapi-agriproject1.onrender.com/api/predict', formData);
      setResult(response.data.Yield_scaled);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(formData)

  return (
    <div className="flex flex-col md:flex-row justify-center">
      {/* Input part */}
      <div className="md:w-1/2 p-8 bg-green-50">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Crop Year */}
          <div>
            <label className="text-right">Crop Year</label>
            <input type="number" name="Crop_Year" value={formData.Crop_Year} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>

          {/* Crop, State, Season, Area, Production, Annual Rainfall, Fertilizer, Pesticide */}
          {/* Each form element wrapped inside a div to facilitate grid layout */}

          <div>
            <label className="text-right">Crop</label>
            <select name="Crop" value={formData.Crop} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full">
            <option value="">Select Crop</option>
{['Arecanut', 'Arhar/Tur', 'Castor seed', 'Coconut ', 'Cotton(lint)', 'Dry chillies', 'Gram', 'Jute', 'Linseed', 'Maize', 'Mesta', 'Niger seed', 'Onion', 'Other  Rabi pulses', 'Potato', 'Rapeseed &Mustard', 'Rice', 'Sesamum', 'Small millets', 'Sugarcane', 'Sweet potato', 'Tapioca', 'Tobacco', 'Turmeric', 'Wheat', 'Bajra', 'Black pepper', 'Cardamom', 'Coriander', 'Garlic', 'Ginger', 'Groundnut', 'Horse-gram', 'Jowar', 'Ragi', 'Cashewnut', 'Banana', 'Soyabean', 'Barley', 'Khesari', 'Masoor', 'Moong(Green Gram)', 'Other Kharif pulses', 'Safflower', 'Sannhamp', 'Sunflower', 'Urad', 'Peas & beans (Pulses)', 'other oilseeds', 'Other Cereals', 'Cowpea(Lobia)', 'Oilseeds total', 'Guar seed', 'Other Summer Pulses', 'Moth'].map(crop => (
  <option key={crop} value={crop}>{crop}</option>
))}

            </select>
          </div>

          {/* State */}
          <div>
            <label className="text-right">State</label>
            <select name="State" value={formData.State} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full">
            <option value="">Select State</option>
{['Assam', 'Karnataka', 'Kerala', 'Meghalaya', 'West Bengal', 'Puducherry', 'Goa', 'Andhra Pradesh', 'Tamil Nadu', 'Odisha', 'Bihar', 'Gujarat', 'Madhya Pradesh', 'Maharashtra', 'Mizoram', 'Punjab', 'Uttar Pradesh', 'Haryana', 'Himachal Pradesh', 'Tripura', 'Nagaland', 'Chhattisgarh', 'Uttarakhand', 'Jharkhand', 'Delhi', 'Manipur', 'Jammu and Kashmir', 'Telangana', 'Arunachal Pradesh', 'Sikkim'].map(state => (
  <option key={state} value={state}>{state}</option>
))}
            </select>
          </div>

          {/* Season */}
          <div>
            <label className="text-right">Season</label>
            <select name="Season" value={formData.Season} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full">
             
<option value="">Select Season</option>
{['Whole Year ', 'Kharif     ', 'Rabi       ', 'Autumn     ', 'Summer     ', 'Winter     '].map(season => (
  <option key={season} value={season}>{season}</option>
))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="text-right">Area (in hectares)</label>
            <input type="number" name="Area" value={formData.Area} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>

          {/* Production */}
          <div>
            <label className="text-right">Production (in tonnes)</label>
            <input type="number" name="Production" value={formData.Production} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>

          {/* Annual Rainfall */}
          <div>
            <label className="text-right">Annual Rainfall (in mm)</label>
            <input type="number" name="Annual_Rainfall" value={formData.Annual_Rainfall} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>

          {/* Fertilizer */}
          <div>
            <label className="text-right">Fertilizer (in kg)</label>
            <input type="number" name="Fertilizer" value={formData.Fertilizer} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>

          {/* Pesticide */}
          <div>
            <label className="text-right">Pesticide (in kg)</label>
            <input type="number" name="Pesticide" value={formData.Pesticide} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
          </div>

          <div className="col-span-2">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">Predict</button>
          </div>
        </form>
      </div>

      {/* Content on the right side */}
      <div className="md:w-1/2 p-8 bg-green-50">
        <h1 className="text-3xl font-bold mb-4 text-green-800">Predict Crop Yield</h1>
        <h2 className="text-3xl font-bold text-green-800">Benefits of Accurate Yield Prediction</h2>
        <p className="mt-4 text-green-800">Accurate yield prediction helps farmers in planning and managing their agricultural activities more efficiently. It enables them to optimize the use of resources such as fertilizers, pesticides, and water, leading to higher crop yields and reduced costs. Additionally, it allows for better risk management and helps in making informed decisions regarding crop selection and cultivation practices.</p>
        {result && <p className="mt-4 bg-green-100 p-2 rounded-md">Predicted Yield: {result}</p>}
      </div>
    </div>
  );
}

export default Yield_Prediction;

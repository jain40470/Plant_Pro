import React, { useState } from 'react';

function SeedStageDetector() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [stageResult, setStageResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      alert('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      const response = await fetch('https://fastapi-plantpro.onrender.com/api/seedstage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStageResult(result);
      } else {
        alert('Error occurred during classification');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center bg-green-50 p-4 rounded-lg">
  <div className="p-4">
    <h1 className="text-4xl font-bold text-green-800 mb-4">Seed Stage Detector</h1>
    <p className="mt-4 text-gray-800">Accurately assessing seed stages is fundamental for optimizing agricultural productivity and ensuring sustainable crop management practices. Our Seed Stage Detector harnesses cutting-edge machine learning techniques to precisely classify seed growth stages from images. Whether you're a farmer, agricultural scientist, or crop consultant, this tool empowers you with actionable insights into the developmental progression of seeds, facilitating informed decisions and proactive interventions for maximizing crop yield and quality.</p>
    {stageResult && (
      <div className="mt-4 bg-green-200 rounded-md p-3">
        <p className="font-bold text-lg text-green-800">Detected stage: {stageResult.stage}</p>
      </div>
    )}
  </div>
  <div className="p-4">
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="border border-gray-400 p-2 rounded-md mb-4" />

      {previewImage && (
        <div className="w-64 h-64 border border-gray-400 mb-4">
          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}

      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
        Detect Stage
      </button>
    </form>
  </div>
</div>


  );
}

export default SeedStageDetector;

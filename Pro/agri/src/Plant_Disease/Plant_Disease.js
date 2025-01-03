import React, { useState } from 'react';

function Plant_Disease() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);

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
      const response = await fetch('https://fastapi-plantpro.onrender.com/api/plantdisease', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setClassificationResult(result);
      } else {
        alert('Error occurred during classification');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-green-50 p-8">
      <div className="md:w-1/2 md:pr-4">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Plant Disease</h1>
        <p className="mt-4 text-green-800">Detecting and diagnosing plant diseases early is crucial for maintaining crop health and maximizing yield. Our Plant Disease Classifier leverages machine learning algorithms to accurately identify diseases affecting various crops. Whether you're a farmer, agronomist, or researcher, this tool provides rapid and reliable analysis, helping you take proactive measures to mitigate crop damage and optimize agricultural practices.</p>
        {classificationResult && (
  <div className="mt-4 bg-green-200 rounded-md p-3">
    <p className="font-bold text-lg text-green-800">Classification result: {classificationResult.predicted_class}</p>
  </div>
)}

      </div>

      <div className="md:w-1/2">
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border border-gray-400 p-2 rounded-md mb-4" />

          {previewImage && (
            <div className="w-64 h-64 border border-gray-400 mb-4">
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
            Classify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Plant_Disease;

import React, { useState } from 'react';

function Image_Classifier() {
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
      const response = await fetch('https://fastapi-plantpro.onrender.com/api/classify', {
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
      <div className="md:w-1/2 md:pl-4">
        <h1 className="font-bold text-green-800 text-4xl">Crop Classifier</h1>
        <p className="mt-4 text-green-800">The Crop Image Classifier is a cutting-edge tool designed to revolutionize agricultural practices by accurately identifying crops from images. Whether you're a farmer, agricultural scientist, or enthusiast, this classifier provides valuable insights into crop identification, enabling informed decision-making and enhanced productivity.</p>
{classificationResult && (
  <div>
    <div className="mt-4 bg-green-200 rounded-md p-3">
      <p className="font-bold text-lg text-green-800">Classification result VGG19: {classificationResult.predicted_class_vgg19}</p>
    </div>
    <div className="mt-4 bg-green-200 rounded-md p-3">
      <p className="font-bold text-lg text-green-800">Classification result Inception: {classificationResult.predicted_class_inception}</p>
    </div>
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

export default Image_Classifier;

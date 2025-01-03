import React, { useState } from 'react';

const AboutUs = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const keyFeatures = [
    {
      title: 'Crop Classification',
      modelUsed: 'VGG-19 (included Inception V3 also)',
      whyUsed: 'VGG-19 is renowned for its exceptional performance in image classification tasks...',
      possibleAlternatives: ['ResNet', 'Inception', 'MobileNet'],
      comparison: 'VGG-19 strikes a balance between accuracy and computational efficiency...',
      implementation: 'VGG-19 can be implemented using deep learning frameworks like TensorFlow or PyTorch...',
      benefits: 'VGG-19\'s architecture simplifies implementation, and its pre-trained models facilitate transfer learning...',
      kaggle : 'https://www.kaggle.com/code/jain40470/crop-classifier'
    },
    {
      title: 'Seed Stage Classification',
      modelUsed: 'InceptionV3',
      whyUsed: 'InceptionV3 excels at capturing fine details in images...',
      possibleAlternatives: ['ResNet', 'MobileNet', 'DenseNet'],
      comparison: 'InceptionV3\'s architecture, with its multi-scale feature extraction, may be advantageous...',
      implementation: 'InceptionV3 can be implemented similarly to VGG-19, leveraging pre-trained models for transfer learning...',
      benefits: 'InceptionV3\'s ability to capture fine details across multiple scales makes it suitable for discerning subtle differences...',
      kaggle : 'https://www.kaggle.com/code/jain40470/seed-stage'
    },
    {
      title: 'Plant Disease Classification',
      modelUsed: 'Vision Transformer (ViT)',
      whyUsed: 'ViT leverages the transformer architecture\'s capability to capture long-range dependencies...',
      possibleAlternatives: ['ResNet', 'Inception', 'DenseNet'],
      comparison: 'ViT\'s transformer architecture offers a novel approach to image classification...',
      implementation: 'ViT can be implemented using frameworks like TensorFlow or PyTorch, with pre-trained models available for transfer learning...',
      benefits: 'ViT\'s ability to capture long-range dependencies makes it suitable for identifying complex patterns...',
      kaggle : 'https://www.kaggle.com/code/jain40470/plant-disease'
    },
    {
      title: 'Yield Prediction',
      modelUsed: 'LSTM (Long Short-Term Memory)',
      whyUsed: 'LSTM is well-suited for modeling sequential data and capturing temporal dependencies...',
      possibleAlternatives: ['GRU (Gated Recurrent Unit)', 'Transformer-based models'],
      comparison: 'LSTM\'s ability to model sequential data effectively and capture long-term dependencies...',
      implementation: 'LSTM models can be implemented using libraries like TensorFlow or PyTorch, with various architectures...',
      benefits: 'LSTM\'s architecture allows it to learn from historical data and capture temporal patterns...',
      kaggle : 'https://www.kaggle.com/code/jain40470/yield-prediction-lstm'
    },
    {
      title: 'Chatbot',
      modelUsed: 'Text generation pipeline (Model: benkimz/agbrain)',
      whyUsed: 'Text generation pipelines based on GPT models are widely used for chatbots due to their ability to generate coherent...',
      possibleAlternatives: ['GPT (Generative Pre-trained Transformer) models like GPT-3, GPT-2'],
      comparison: 'The choice of "benkimz/agbrain" for the chatbot model likely considers factors such as response quality...',
      implementation: 'Text generation pipelines based on GPT models can be implemented using frameworks like Hugging Face\'s Transformers library...',
      benefits: 'GPT-based chatbots can generate human-like responses, engage in meaningful conversations, and adapt to diverse contexts...',
      kaggle : ''
    },
  ];

  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-4">About PlantPro</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Introduction</h2>
          <p className="text-gray-700">
            Project Report: PlantPro - Empowering Farmers with AI-driven Plant Insights. PlantPro is an innovative agricultural project that aims to empower farmers with AI-driven plant insights. By leveraging the power of artificial intelligence, PlantPro provides farmers with valuable information and recommendations to optimize their crop management and enhance overall productivity. Through advanced technologies and machine learning algorithms, PlantPro offers a comprehensive platform for crop classification, disease detection, seed stage identification, yield prediction, and real-time assistance.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Project Objectives</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Develop AI models for crop classification, plant disease detection, seed stage identification, yield prediction, and real-time assistance through chatbot integration.</li>
            <li>Build an intuitive and user-friendly web interface accessible to farmers and agricultural professionals for utilizing AI models and accessing valuable insights.</li>
            <li>Implement a chatbot feature capable of understanding natural language queries and providing instant assistance on various agricultural topics.</li>
            <li>Deploy the project on Render.com using Docker containers to ensure scalability, accessibility, and ease of deployment.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            {keyFeatures.map((feature, index) => (
              <li key={index}>
                <button
                  className="text-green-700 hover:underline focus:outline-none"
                  onClick={() => toggleDropdown(index)}
                >
                  {feature.title}
                </button>
                {openDropdown === index && (
                  <div className="text-gray-700 ml-4">
                    <p><strong><a href={feature.kaggle}>Kaggle Notebook</a></strong></p>
                    <p><strong>Model Used:</strong> {feature.modelUsed}</p>
                    <p><strong>Why Used:</strong> {feature.whyUsed}</p>
                    <p><strong>Possible Alternatives:</strong> {feature.possibleAlternatives.join(', ')}</p>
                    <p><strong>Comparison:</strong> {feature.comparison}</p>
                    <p><strong>Implementation:</strong> {feature.implementation}</p>
                    <p><strong>Benefits and Key Features:</strong> {feature.benefits}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-800">API ENDPOINTS</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li> <b>/api/classify: </b> This endpoint accepts image files and uses a VGG-19 model to classify crops.</li>
            <li> <b>/api/seedstage:</b>  This endpoint accepts image files and uses an InceptionV3 model to classify seed stages.</li>
            <li> <b>/api/plantdisease: </b> This endpoint accepts image files and uses a Vision Transformer (ViT) model to classify plant diseases. </li>
            <li> <b>/api/predict:</b> This endpoint is for yield prediction. It takes input data for yield prediction, presumably features related to agriculture, and returns predictions. Uses LSTM </li>
            <li> <b>/api/chatbot: </b> This endpoint is for interacting with a chatbot. It takes a message input, generates a response using a text generation pipeline (model: benkimz/agbrain), and returns the response.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            PlantPro offers a range of features designed to assist farmers in optimizing their crop management practices and improving overall productivity.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Python</li>
            <li>FastAPI</li>
            <li>TensorFlow and Keras</li>
            <li>React.js</li>
            <li>Docker</li>
            <li>Render.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

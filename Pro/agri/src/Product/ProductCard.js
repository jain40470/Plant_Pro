import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-56 object-cover object-center" src={product.image} alt={product.name} />
      <div className="px-4 py-2">
        <h2 className="text-gray-800 text-lg font-semibold">{product.name}</h2>
        {/* <p className="text-gray-600">{product.heading}</p>
        <p className="text-gray-600">{product.specification}</p> */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl text-gray-800 font-semibold">{product.price}</p>
          <button className="px-3 py-1 bg-green-500 text-white text-xs uppercase font-semibold rounded">
            Want Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
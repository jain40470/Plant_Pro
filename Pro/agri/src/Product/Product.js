import React from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component

const Product = () => {
  // Define the product data array using JSON-like data
  const productData = [
    { "id": 1, "name": "Product 1", "image": "http://via.placeholder.com/150/C7FFC7", "heading": "Product 1 Heading", "specification": "Product 1 Specification", "price": "Rs.100" },
    { "id": 2, "name": "Product 2", "image": "http://via.placeholder.com/150/C7FFC7", "heading": "Product 2 Heading", "specification": "Product 2 Specification", "price": "Rs.150" },
    { "id": 3, "name": "Product 3", "image": "http://via.placeholder.com/150/C7FFC7", "heading": "Product 3 Heading", "specification": "Product 3 Specification", "price": "Rs.120" },
    { "id": 4, "name": "Product 4", "image": "http://via.placeholder.com/150/C7FFC7", "heading": "Product 4 Heading", "specification": "Product 4 Specification", "price": "Rs.200" },
    { "id": 5, "name": "Product 5", "image": "http://via.placeholder.com/150/C7FFC7", "heading": "Product 5 Heading", "specification": "Product 5 Specification", "price": "Rs.180" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {productData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Product
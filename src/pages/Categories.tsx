import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Categories = () => {
  const { category } = useParams();
  const categoryProducts = products.filter(product => product.category === category);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4 capitalize">{category}</h1>
        <p className="text-gray-600">Discover our exclusive collection of {category}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
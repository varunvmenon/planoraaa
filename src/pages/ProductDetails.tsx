import React from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addToCart = useStore((state) => state.addToCart);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
          <p className="text-gray-600">{product.description}</p>

          {product.features && (
            <div>
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="btn-secondary p-3">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIVenueAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeVenue();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeVenue = async () => {
    setIsAnalyzing(true);
    // Simulating AI analysis delay
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          title: 'Traditional Kerala Arrangement with Flower',
          description: 'A luxurious mandap with fresh flower decorations and traditional elements',
          image: 'https://i.pinimg.com/736x/2c/c3/5a/2cc35a7170d41b6234809a662437a886.jpg',
          price: 125000
        },
        {
          id: 2,
          title: 'Contemporary Floral Arrangement',
          description: 'Modern floral arrangements with a mix of traditional and contemporary elements',
          image: 'https://anilevents.in/wp-content/uploads/2020/03/Rose-Floral-Wedding-Decoration-768x576.jpg',
          price: 75000
        },
        {
          id: 3,
          title: 'Royal Draping Package',
          description: 'Elegant fabric draping with premium materials and lighting',
          image: 'https://img.freepik.com/premium-photo/royal-indian-wedding-backdrop-with-regal-drapes_1174497-149927.jpg',
          price: 95000
        },
        {
          id: 4,
          title: 'Indian Style Cuisine',
          description: 'Traditional Kerala feast on a banana leaf with a variety of vegetarian dishes, ending with a sweet payasam',
          image: 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          price: 40000
        },
        {
          id: 5,
          title: 'Chinese Style Cuisine ',
          description: 'Chinese food is a flavorful blend of noodles, stir-fries, dumplings etc.',
          image: 'https://plus.unsplash.com/premium_photo-1694708455249-992010f9db32?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
          price: 50000
        },
        {
          id: 6,
          title: 'Western Style Cuisine ',
          description: 'A taste of the West, from rustic charm to sophisticated elegance..',
          image: 'https://images.unsplash.com/photo-1680678242896-a8e64cb95b62?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          price: 35000
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI Venue Analysis</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload photos of your venue and let our AI suggest perfect decorations that match your style and space.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg">
        {!selectedImage ? (
          <label className="block w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="h-full flex flex-col items-center justify-center space-y-4 text-gray-500">
              <Upload className="w-12 h-12" />
              <div className="text-center">
                <p className="font-medium">Click to upload venue photo</p>
                <p className="text-sm">or drag and drop</p>
              </div>
            </div>
          </label>
        ) : (
          <div className="space-y-8">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Venue"
                className="w-full h-full object-cover"
              />
            </div>

            {isAnalyzing ? (
              <div className="flex items-center justify-center space-x-2 text-pink-500">
                <Loader className="w-6 h-6 animate-spin" />
                <span>Analyzing venue...</span>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Recommended Decorations</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {recommendations.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow overflow-hidden"
                    >
                      <div className="aspect-square">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">₹{item.price.toLocaleString()}</span>
                          <button className="btn-primary">Add to Cart</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedImage(null)}
              className="btn-secondary"
            >
              Upload Different Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIVenueAnalysis;
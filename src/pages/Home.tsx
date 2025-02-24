import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Palette, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-3xl overflow-hidden">
        <img
          src="http://media.architecturaldigest.com/photos/645edbda92731dd4557434e5/master/pass/GettyImages-1346760361.jpg"
          alt="Indian Wedding"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-6"
              >
                Create Your Dream Wedding
              </motion.h1>
              <p className="text-xl mb-8">
                Plan your perfect Indian wedding with AI-powered recommendations and expert assistance
              </p>
              <Link
                to="/venue-analysis"
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                Start Planning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="grid md:grid-cols-3 gap-8">
        <CategoryCard
          title="Wedding Attire"
          description="Exclusive collection of designer lehengas, sarees, and sherwanis"
          image="https://i.pinimg.com/1200x/4e/17/79/4e17797babc5ee6d0a3f1a6df250aed3.jpg"
          link="/categories/dresses"
          icon={<Sparkles className="w-6 h-6" />}
        />
        <CategoryCard
          title="Decorations"
          description="Transform your venue with stunning traditional and modern décor"
          image="https://shineevents.co.in/wp-content/uploads/2022/08/WhatsApp-Image-2023-07-18-at-4.15.37-PM-1-1536x890.jpeg"
          link="/categories/decorations"
          icon={<Palette className="w-6 h-6" />}
        />
        <CategoryCard
          title="Photography"
          description="Capture your special moments with our expert photographers"
          image="https://pbs.twimg.com/media/FMv32kSakAEjwCd?format=jpg&name=900x900"
          link="/categories/photography"
          icon={<Camera className="w-6 h-6" />}
        />
      </section>

      {/* AI Feature Highlight */}
      <section className="bg-white rounded-3xl p-12 shadow-xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">AI-Powered Venue Analysis</h2>
            <p className="text-gray-600 mb-8">
              Upload photos of your venue and let our AI suggest perfect decorations that match your style and space.
              Get personalized recommendations for your dream wedding setup.
            </p>
            <Link
              to="/venue-analysis"
              className="inline-flex items-center space-x-2 text-pink-500 font-semibold hover:text-pink-600"
            >
              <span>Try it now</span>
              <span>→</span>
            </Link>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <img
              src="https://i.pinimg.com/564x/f4/10/14/f410142fc4cd131015e0223243fa0448.jpg"
              alt="AI Analysis"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, description, image, link, icon }) => (
  <Link to={link} className="group">
    <div className="relative h-96 rounded-2xl overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 p-8 flex flex-col justify-end">
        <div className="text-white">
          <div className="mb-4 p-3 bg-white/20 rounded-full w-fit backdrop-blur-sm">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default Home;
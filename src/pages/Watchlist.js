import React from 'react';
import { HeartFilled, ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import Card from '../component/Card';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-900 to-cyan-900 flex flex-col items-center py-10 px-4 text-white">
     
      <div className="w-full max-w-7xl mb-10">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleClick} 
            className="p-2 rounded-full transition-all duration-300 hover:bg-cyan-500/20 hover:shadow-cyan-100">
            <ArrowLeftOutlined className="text-white text-2xl" />
          </button>
        </div>

        <div className="text-center">
          <h1 className="font-extrabold text-4xl md:text-5xl flex items-center justify-center gap-3">
            Your WishList 
            <HeartFilled className="text-red-500 text-4xl animate-pulse" />
          </h1>
          <p className="text-gray-400 text-lg mt-2">
            All your favorite movies in one place 🎬
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col  items-center justify-center mt-20 text-center">
          <div className="bg-gray-800 rounded-full p-6 mb-6 shadow-md">
            <HeartFilled className="text-gray-600 text-6xl" />
          </div>
          <p className="text-gray-400 text-xl mb-2">No movies added yet 😔</p>
          <p className="text-gray-500">Start exploring and add some to your wishlist!</p>
        </div>
      ) : (
        
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center mt-8">
          {wishlist.map((movie) => (
            <Card
              key={movie.id || movie.key}
              {...movie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

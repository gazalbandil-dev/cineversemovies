import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { HeartFilled, MenuOutlined, CloseOutlined, HomeOutlined } from "@ant-design/icons";
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const NavigationBar = ({ onSearch: handleParentSearch }) => {

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(debouncedValue);
    handleParentSearch(debouncedValue);
  }, [debouncedValue, handleParentSearch]);


  const handleCardClick = () => {
    navigate("/wishlist");
    setIsOpen(false);

  }
  const handleSearchNavigation = () => {
    navigate("/search");

  }
  const homenavigate = () => {
    navigate('/');
    setIsOpen(false);
  }


  return (
    <>
      <div className=" flex items-center justify-between px-6 py-3 bg-gray-900 text-white sticky top-0 z-50">
        <div onClick={homenavigate} className="flex items-center gap-3 cursor-pointer select-none">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white drop-shadow-[0_0_25px_rgba(6,182,212,0.8)] tracking-wide">
            Cine<span className="text-white">Verse</span>
          </h1>
        </div>

        <div className="flex-1 mx-6 max-w-lg hidden sm:block">
          <Search
            placeholder="Search Movies..."
            allowClear
            size="large"
            className="rounded-md border-b-2 border-cyan-400 bg-transparent transition-shadow duration-300 text-white placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={handleSearchNavigation}
          />
        </div>

        <div
          onClick={handleCardClick}
          className="items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-cyan-100 hidden sm:flex"
        >
          <HeartFilled className="text-rose-500 text-2xl" />
          <h2 className="font-semibold text-lg text-zinc-200">Wishlist</h2>
        </div>



        {/* hamburger */}

        <div className="sm:hidden text-xl cursor-pointer" onClick={() => setIsOpen(true)}>
          <MenuOutlined />
        </div>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-50 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Menu</h2>
          <CloseOutlined className="text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col gap-6 px-5 mt-6">

          {/* Mobile Search */}
          <Search
            placeholder="Search Movies..."
            allowClear
            size="middle"
            className="rounded-md border-b-2 border-cyan-400 bg-transparent text-white placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={handleSearchNavigation}
          />

          {/* Wishlist */}
          <div
            onClick={handleCardClick}
            className="flex items-center gap-3 px-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-white/10"
          >
            <HeartFilled className="text-rose-500 text-lg" />
            <span className="text-lg font-semibold">Wishlist</span>
          </div>

          {/* Home */}
          <div
            onClick={homenavigate}
            className="flex items-center gap-3 px-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-white/10"
          >
            <HomeOutlined className="text-gray-200 text-lg" />
            <span className="text-lg font-semibold">Home</span>
          </div>

        </div>
      </div>

    </>


  );
};

export default NavigationBar;
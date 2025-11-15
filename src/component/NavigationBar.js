import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { HeartFilled } from "@ant-design/icons";
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const NavigationBar = ({ onSearch: handleParentSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query);



  useEffect(() => {
    console.log(debouncedValue);
    handleParentSearch(debouncedValue);
  }, [debouncedValue, handleParentSearch]);

  const handleCardClick = () => {
    navigate("/wishlist");

  }

  const handleSearchNavigation = () => {
    navigate("/search");
  }

  const homenavigate = () => {
    navigate('/');
  }


  return (
    <div className=" flex items-center justify-between px-6 py-3 bg-gray-900 text-white sticky top-0 z-50">
      <div onClick={homenavigate} className="flex items-center gap-3 cursor-pointer select-none">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white drop-shadow-[0_0_25px_rgba(6,182,212,0.8)] tracking-wide">
          Cine<span className="text-white">Verse</span>
        </h1>
      </div>
      <div className="flex-1 mx-6 max-w-lg">
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
        className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-cyan-100"
      >
        <HeartFilled className="text-rose-500 text-2xl" />
        <h2 className="font-semibold text-lg text-zinc-200">Wishlist</h2>
      </div>
    </div>
  );
};

export default NavigationBar;
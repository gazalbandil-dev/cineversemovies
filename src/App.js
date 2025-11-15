import './tailwind.css';
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search"
import Home from "./pages/Home"
import Watchlist from './pages/Watchlist';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Navigation from './component/NavigationBar';



function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Provider store={store}>
        <Navigation onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search searchQuery={searchQuery} />} />
          <Route path="/wishlist" element={<Watchlist />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;

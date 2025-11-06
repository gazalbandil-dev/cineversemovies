import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Card from './component/Card';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Card />
  </React.StrictMode>
);


reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 這裡我們刪除了對 index.css 和 reportWebVitals 的引用，
// 因為你的資料夾中目前沒有這些檔案。
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

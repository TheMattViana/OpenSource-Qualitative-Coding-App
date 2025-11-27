import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// If you have a local CSS file, import it here. 
// If not, this line can be removed, but standard setups usually have it.
// import './index.css'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
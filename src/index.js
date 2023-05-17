import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './ContextFiles/Context';
import { ThemeContextProvider } from './ContextFiles/ThemeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
    <ContextProvider>
    <App />
    </ContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);



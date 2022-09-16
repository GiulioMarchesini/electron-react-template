import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));

//backend to frontend
let varBackEnd = 0;

window.electronAPI.funzFrontEnd((event, value) => {
  varBackEnd = value;
  doRendering();
})

const doRendering = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
};
doRendering();
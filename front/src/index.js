import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);




// reportWebVitals(); 웹 성능검사 함수 굳이 react 생성시 자동으로 따라옴 없어도됨
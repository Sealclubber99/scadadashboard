import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cards from "./Cards";
import CardDeck from "./CardDeck";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
const assets =[
    'BatCave',
    'Heights',
    'Loop 4631',
    'Brazoria',
    'Lopeno 1',
    'Pueblo 1',
    'Pueblo 2',
    'Ranchtown',
    'Sweeny',
    'Zapata 1',
    'Zapata 2',
    'Alvin',
    'Angleton',
    'Magnolia',
    'Odessa'
]
root.render(
  <React.StrictMode>
      <div className="container-fluid d-flex flex-row justify-content-around overflow-auto flex-wrap">
          <CardDeck assets = {assets}></CardDeck>
      </div>



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

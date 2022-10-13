import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cards from "./Cards";
import CardDeck from "./CardDeck";
import ToolBar from './ToolBar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CardComponent from "./components/cardComponent";
import NavComponent from "./components/navComponent";
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

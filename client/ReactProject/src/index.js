import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './Misc/reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './_helpers/store';
import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';




ReactDOM.render(
  <Provider store = {store}>
    <HelmetProvider>
      <ProductsContextProvider>
        <CartContextProvider>

      <App />
      </CartContextProvider>
    </ProductsContextProvider>
  </HelmetProvider>,

  </Provider>,
  document.getElementById('main')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

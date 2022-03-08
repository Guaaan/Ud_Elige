import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Products from './components/Products';

function App() {

  return (
    <div className="App">
      <NavBar />
      <br />
      <div className='container'>
        <Products nombre="abrilar jarabe para la tos" />
        <br />
        <Products nombre="abrilar jarabe para la tos" />
        <br />
        <Products nombre="abrilar jarabe para la tos" />


      </div>
    </div>
  );
}

export default App;

//import logo from './logo.svg';
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
        <Products  literal="a" nombre="abrilar jarabe para la tos" info="Esta es la información del producto debe mostrarse debajo de éste" tipo="Marca"/>
        <br />
        <Products  literal="b" nombre="generico de abrilar" info="Esta es la información del producto debe mostrarse debajo de éste" tipo="Bioequivalente"/>
        <br />
        <Products  literal="c" nombre="bioequivalente de abrilar " info="Esta es la información del producto debe mostrarse debajo de éste" tipo="Generico"/>
      </div>
      
    </div>
  );
}

export default App;

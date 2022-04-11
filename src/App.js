//import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavBar from './components/NavBar';

//import Cliente from './components/Cliente';


//import Products from './components/Products';
//import Conne from './components/Conne';
//import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import PantallaPos from "./PantallaPos.js";

var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");

instancia.OnMostrarTriada(function(id, triadas)
{
  console.log(triadas);
  return true;  
});

//instancia.NotificarTriada(id, "XXX-XXXX");
instancia.Start();

const App = () => {
  
      return (
        <div className="App">
      <NavBar />

      <br />
      {/* <div className='container'>
        <Products literal="a" nombre="abrilar jarabe para la tos" info="Esta es la información del producto debe mostrarse debajo de éste" tipo="Marca" />
        <br />
        <Products literal="b" nombre="generico de abrilar" info="Esta es la información del producto debe mostrarse debajo de éste" tipo="Bioequivalente" />
        <br />
        <Products literal="c" nombre="bioequivalente de abrilar " info="Esta es la información del producto debe mostrarse debajo de éste" tipo="Generico" />
      </div> */}

    </div>
  );
}

export default App;

//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
//import Products from './components/Products';
import PantallaPos from "./PantallaPos.js";
//import CardsB from './components/CardsB';
import OpcionA from './pages/OpcionA';
import OpcionB from './pages/OpcionB';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");

instancia.Start();

instancia.NotificarTriada();

const App = () => {

  const [products, setProducts] = useState([]);
  const [transId, setTransId] = useState();
  const funcion = (articuloSeleccionado) => {
    instancia.NotificarTriada(transId, articuloSeleccionado);
    console.log(articuloSeleccionado);
  }

  instancia.OnMostrarTriada(function (id, triadas) {
    console.log(triadas);
    setProducts(triadas);
    setTransId(id);
    return true;
  });

  // const literalIncrement = (numb) => {
  //   const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  //   return alphabet[numb];
  // }



  return (
    <div className="App">
      <NavBar opcionA="opcion-a" opcionB="opcion-b"/>

      <br />
      <div className='container'>
        {/* <ol type='A'>

          {products.map((product, index) => (

            <li value={literalIncrement(index)}>

              <Products key={product.codigoInterno}
                // the literal is equal to the index of the array

                nombre={product.articuloNombre}
                info={product.laboratorioNombre}
                precio={product.precio}
                img={product.imagen}
                cod={product.codigoInterno}
                precioOferta={product.precioOferta}
                cantidadMinima={product.cantidadMinima}
                func={funcion}
              />
            </li>

          ))}
        </ol> */}

        <div className="row">
          {/* {products.map((product, index) => (
            <div className="col-md-4" id={index} >
              <CardsB key={product.precioOferta}
                img={product.imagen}
                nombre={product.articuloNombre}
                info={product.laboratorioNombre}
                precio={product.precio}
                precioOferta={product.precioOferta}
                cantidadMinima={product.cantidadMinima}
                literal={index}
                func={funcion}
              />
            </div>

          ))} */}
          <Router>

            <Switch>

              <Route path="/opcion-a">
                <OpcionA />
              </Route>
              <Route path="/opcion-b">
                <OpcionB />
              </Route>
            </Switch>
          </Router>

        </div>
      </div>
    </div>
  );
}

export default App;

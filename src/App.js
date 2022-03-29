//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Products from './components/Products';
import PantallaPos from "./PantallaPos.js";

var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");





//instancia.NotificarTriada(id, "090-0010");
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

  const literalIncrement = (numb) => {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    return alphabet[numb];
  }

  

  return (
    <div className="App">
      <NavBar />

      <br />
      <div className='container'>
        <ol type='A'>

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
                func={funcion}
              />
            </li>

          ))}
        </ol>


      </div>

    </div>
  );
}

export default App;

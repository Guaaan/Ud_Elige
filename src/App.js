//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
//import NavBar from './components/NavBar';
//import Products from './components/Products';
import PantallaPos from "./PantallaPos.js";
//import CardsB from './components/CardsB';
import OpcionA from './pages/OpcionA';
import OpcionB from './pages/OpcionB';
import { Navbar, Container, Nav,  } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");

instancia.Start();


const App = () => {

  //const rutaServidor = '/ud-elige'; //producción
  const rutaServidor = '';            //desarrollo
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
      <Router>
        <Navbar className="color-nav" variant="dark">
          <Container>
            <Navbar.Brand to="/" href="#home">
              <img src="https://www.redfarma.cl/img/sitio/logo.png" height="50px" alt="RedFarma Logo" />
            </Navbar.Brand>
            <Nav className="me-auto">

              <Nav.Link to="opcion-a">Opción A</Nav.Link>
              <Nav.Link to="opcion-b">Opción B</Nav.Link>

            </Nav>
          </Container>
        </Navbar>

        <br />
        <div className='container'>





         
			<Route path={rutaServidor+"/opcion-a"} component={OpcionA} exact />
			<Route path={rutaServidor+"/opcion-b"} component={OpcionB} exact />
         

        </div>
      </Router>
    </div>
  );
}

export default App;

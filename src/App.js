//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
//import NavBar from './components/NavBar';
//import Products from './components/Products';
import PantallaPos from "./PantallaPos.js";
import CardsB from './components/CardsB';
import { Navbar, Container, Nav, Col, Carousel, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");

instancia.Start();


const App = () => {

  //const rutaServidor = '/ud-elige'; //producción
  const rutaServidor = '';            //desarrollo
  const [products, setProducts] = useState([]);
  const [transId, setTransId] = useState();
  const funcion = (articuloSeleccionado) => {
    instancia.NotificarTriada(transId, articuloSeleccionado);
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

  const ShowAndHide = () => {
    if (products.length === 0) {
      return (
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/800/400?random=1"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/800/400?random=1"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/800/400?random=1"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )
    }
    else {
      return (
        <div className="row justify-content-center">
          {products.map((product, index) => (
            // <div className="col-4 p-4" id={index} >
            <Col>
              <CardsB key={index}
                img={product.imagen}
                nombre={product.articuloNombre}
                info={product.laboratorioNombre}
                precio={product.precio}
                precioOferta={product.precioOferta}
                cantidadMinima={product.cantidadMinima}
                cod={product.codigoInterno}
                literal={index}
                func={funcion}
              />
            </Col>
            // </div>

          ))}

        </div>
      )
    }
  }


  return (
    <div className="App">
      <Navbar className="color-nav" variant="dark">
        <Container>
          <Navbar.Brand to="/" href="#home">
            <img src="https://www.redfarma.cl/img/sitio/logo.png" height="50px" alt="RedFarma Logo" />
          </Navbar.Brand>
          <Nav className="me-auto">


          </Nav>
        </Container>
      </Navbar>
      <br />
      <div className='container'>

        <ShowAndHide />

      </div>

    </div>
  );
}

export default App;

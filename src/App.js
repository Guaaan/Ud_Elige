//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
//import NavBar from './components/NavBar';
//import Products from './components/Products';
import PantallaPos from "./PantallaPos.js";
import CardsB from './components/CardsB';
import { Navbar, Container, Nav, Col, Carousel, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");

instancia.Start();


const App = () => {

  //const rutaServidor = '/ud-elige'; //producción
  //const rutaServidor = '';            //desarrollo
  const [products, setProducts] = useState([]);
  const [transId, setTransId] = useState();
  const [promos, setPromos] = useState([]);

  //fetch an api 
  // const promosUrl = 'https://api.redfarma.cl/ud-elige/v0.1/banner/56/CAJA66'
  // axios.get(promosUrl)
  // .then(response =>{
  //   setPromos(response.data);
  // })

  useEffect(() => {
    const promosUrl = 'https://api.redfarma.cl/ud-elige/v0.1/banner/56/CAJA66'
    axios.get(promosUrl)
      .then(response => {
        setPromos(response.data);
      })
  }, []);

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
      if (promos) {
        console.log('https://app.redfarma.cl/ud-elige/' + promos);
        return (
          <Carousel variant="dark"
            autoPlay={true}
            interval={5000}
            controls={true}
            indicators={true}>
            {/*  show the first item in promos */}
            {promos.map((promo, index) => (

              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={'https://app.redfarma.cl/ud-elige/' + promos[index]}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}

            {/* <Carousel.Item>
            <img
              className="d-block w-100"
              src={'https://app.redfarma.cl/ud-elige/'+promos[0]}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5></h5>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item> */}
          </Carousel>
        )
      }
      else {
        return (
          <h1>Estamos teniendo problemas para mostrar promociones</h1>
        )
      }
    }
    else {
      return (<>
        <Navbar className="color-nav" variant="dark">
          <Container>
            <Navbar.Brand to="/" href="#home">
              <img src="https://www.redfarma.cl/img/sitio/logo.png" height="50px" alt="RedFarma Logo" />
            </Navbar.Brand>
            <Nav className="me-auto">


            </Nav>
          </Container>
        </Navbar>
        <div className='container'>
          <br />
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
        </div>
      </>
      )
    }
  }


  return (
    <div className="App">
      {/* <Navbar className="color-nav" variant="dark">
        <Container>
          <Navbar.Brand to="/" href="#home">
            <img src="https://www.redfarma.cl/img/sitio/logo.png" height="50px" alt="RedFarma Logo" />
          </Navbar.Brand>
          <Nav className="me-auto">


          </Nav>
        </Container>
      </Navbar> 

      <div className='container'>*/}
      {/* <p> {promos.value} </p>
      <button onClick={}>testttt</button> */}
      <ShowAndHide />

      {/* </div> */}

    </div>
  );
}

export default App;

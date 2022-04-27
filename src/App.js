import React, { useEffect, useState } from 'react';
//import NavBar from './components/NavBar';
//import Products from './components/Products';
import PantallaPos from "./PantallaPos.js";
import Cards from './components/Cards';
import { Col, Carousel, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Footer from './components/Footer';
import './App.css';

var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");

instancia.Start();

const App = () => {

  //const rutaServidor = '/ud-elige'; //producción
  //const rutaServidor = '';            //desarrollo
  const [products, setProducts] = useState([]);
  const [transId, setTransId] = useState();
  const [promos, setPromos] = useState([]);

  const selectProduct = (product) => {
    console.log(JSON.stringify(product));
    setProducts([product]);

  }
  // const cancelTriada = () => {
  //   setProducts([]);
  // }


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
  
  
  const ShowAndHide = () => {
    if (products.length === 0) {
      if (promos) {
        console.log('https://app.redfarma.cl/ud-elige/' + promos);
        return (
          <Carousel variant="light"
            className="carousel-size"
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
        <div >

          <h1 className="title">Por favor, elige tu alternativa:</h1>
        </div>
        <div className='container'>
          {/* <br /> */}
          <div className="cards row justify-content-center">
            {products.map((product, index) => (
          
              // <div className="col-4 p-4" id={index} >
              
              <Col md lg="4" className="columna-cards" onClick={()=>{selectProduct(products[index])}}>
                
                
                <Cards key={index}
                  img={product.imagen}
                  //nombre={product.articuloNombre}
                  info={product.laboratorioNombre}
                  precio={product.precio}
                  precioOferta={product.precioOferta}
                  cantidadMinima={product.cantidadMinima}
                  cod={product.codigoInterno}
                  literal={index}
                  func={funcion}
                  tipo={product.tipo}
                  bioequivalente={true}
                />
              </Col>
              // </div>
              ))}

          </div>
        </div>
        <Footer/>

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

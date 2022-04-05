//import logo from './logo.svg';
import '../App.css';
import React, { useState } from 'react';
//import Products from './components/Products';
import PantallaPos from "../PantallaPos.js";
import CardsB from '../components/CardsB';
import { Col } from 'react-bootstrap';


var instancia = new PantallaPos("https://api.redfarma.cl/ud-elige/v0.1/PantallaPos");

//instancia.NotificarTriada(id, "090-0010");
instancia.Start();

const OpcionB = () => {

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



    return (

        <div className='container'>


            <div className="row justify-content-center">
                {products.map((product, index) => (
                    // <div className="col-4 p-4" id={index} >
                    <Col>
                        <CardsB key={product.precioOferta}
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

    );
}

export default OpcionB;

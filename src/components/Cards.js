import React from "react";
import { Card, Row, Container } from "react-bootstrap";
import NumberFormat from 'react-number-format';
import Bioequivalente from '../img/Bioequivalente-04.png'
import '../App.css';
import Placeholder from '../img/placeholder.png'



export const Cards = (props) => {


    // const handleClick = () => {
    //     //console.log(props.cod);
    //     //props.func(props.cod);
    //     console.log(props)
    //     return props

    // };


    function PrecioOferta(props) {

        return (<>

            <Row>

            </Row>
            <span >
                <strong className="dark-text">

                    Oferta:&nbsp;&nbsp;
                    {props.cantidadMinima > 1 && (<>

                        {props.cantidadMinima}X
                        {props.cantidadMinima <= 1 && (<></>)}


                    </>)}
                </strong>
            </span>




            <span >
                <NumberFormat className="card-text price" value={props.precioOferta} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />
            </span>

            <Row>
                <strong >

                    <span className="dark-text">

                        Antes:&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>


                    <span className="disabled-price">
                        <NumberFormat value={props.precio} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />
                    </span>
                </strong>

            </Row>



            <Card.Text >

            </Card.Text>
            <Card.Text className="card-text disabled-price">

            </Card.Text>
        </>);
    }

    function PrecioNormal(props) {
        return (<>

            <NumberFormat className="price" value={props.precio} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />

            <Card.Text className="card-text price">
            </Card.Text>

        </>);
    }

    function Precios(props) {
        const precioOferta = props.precioOferta;
        const precio = props.precio;
        const cantidadMinima = props.cantidadMinima;

        if (precioOferta > 0) {
            return <PrecioOferta cantidadMinima={cantidadMinima} precio={precio} precioOferta={precioOferta} />;
        }
        return <PrecioNormal precio={precio} />;
    }


    return (
        <>
            <div className="outter-borders" >

                {/* <Card style={{ width: '25rem' }}> */}
                <div>
                    <Card.Title className="purple-text">

                        <strong>
                            <Container>
                                <Row>

                                    {props.tipo === 'G' && (<span className="generico">Generico</span>)}
                                    {props.tipo === 'S' && (<span className="similar">Similar</span>)}
                                    {props.tipo === 'M' && (<span className="marca">Marca</span>)}


                                </Row>

                            </Container>
                        </strong>
                    </Card.Title>
                </div>
                {props.tieneImagen === false && (<img className="no-img" variant="top" src={Placeholder} alt={props.cod} />)}
                {props.tieneImagen === true && (<img className="img-holder" variant="top" src={props.img} alt={props.cod} />)}
                    
                {/* <Card.Body> */}
                {/* <div className="left-text title">

                        <Card.Text>{props.info}
                            <h3 className="purple-text">{props.nombre}</h3>
                        </Card.Text>
                    </div> */}
                <div className="cuerpo-carta">

                    <Precios cantidadMinima={props.cantidadMinima} precioOferta={props.precioOferta} precio={props.precio} />
                    {props.bioequivalente === true && (<img className="bioequivalente" src={Bioequivalente} alt="imagen de bioequivalente" />)}
                </div>

                {/* </Card.Body> */}

                {/* </Card> */}
            </div>

        </>
    );
};

export default Cards;
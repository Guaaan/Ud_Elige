import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import NumberFormat from 'react-number-format';

export const Products = (props) => {
    //console log props.literal on click event

    const handleClick = () => {
        console.log(props.cod);
        props.func(props.cod);

    };

    //props.literal increments by 1 foreach from a to z
    // const literalIncrement = (numb) => {
    //     const alphabet = ["A","B","C","D","E","F","G","H","I","J","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    //     return alphabet[numb];
    // }

    function PrecioOferta(props) {

        return (<>
            <Card.Text >

                <Row xs="auto">

                    <Col className="md-1">
                    </Col>
                    <Col className="md-2">
                        <div>

                            <h5 className="dark-text">
                                {props.cantidadMinima > 1 && (<>
                                    {props.cantidadMinima}X &nbsp;
                                </>)}
                                {props.cantidadMinima <= 1 && (<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)}
                                <NumberFormat className="card-text price" value={props.precioOferta} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />
                            </h5>
                        </div>

                    </Col>
                </Row>


            </Card.Text>
            <Card.Text className="card-text disabled-price">
                
                <NumberFormat value={props.precio} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />
            </Card.Text>
        </>);
    }

    function PrecioNormal(props) {
        return (<>
            <Card.Text className="card-text price">
                <NumberFormat value={props.precio} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />
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

            <div className="custom-card" onClick={handleClick}>

                    <div className="row g-0 align-center">
                        <div className="col-md-4 ">
                            <Row>
                                {/* <Col className="col-md-2 align-center text-center">
                                <h2 className="p-2 purple-text">{literalIncrement(props.literal)})</h2>
                            </Col> */}
                                <Col className="">

                                    <div>
                                        <Card.Img className="product-image " src={props.img} alt={props.cod} />
                                    </div>
                                </Col>
                            </Row>

                        </div>
                        <div className="col-md-8">
                            <Card.Body className="card-body">
                                <Container>
                                    <Row>
                                        <Col className="left-text">
                                            {/* <Card.Text className="card-text"><small className="text-muted">Marca</small></Card.Text> */}
                                            <Card.Text className="card-text gray-text">{props.info}
                                                <br />
                                                
                                            </Card.Text>
                                            <h3 className="purple-text">{props.nombre}</h3>
                                            <Card.Text className="card-text"></Card.Text>
                                        </Col>

                                        <Col className="col-md-3 text-right">
                                            <Precios cantidadMinima={props.cantidadMinima} precioOferta={props.precioOferta} precio={props.precio} />
                                        </Col>
                                    </Row>

                                </Container>
                            </Card.Body>
                        </div>
                    </div>

            </div>
            <br />
        </>
    );
};

export default Products;
import React from "react";
import { Card, Row, Col, Container, Table } from "react-bootstrap";
import NumberFormat from 'react-number-format';
import '../App.css';


export const CardsB = (props) => {
    //console log props.literal on click event

    const handleClick = () => {
        console.log(props.cod);
        props.func(props.cod);

    };

    //props.literal increments by 1 foreach from a to z
    const literalIncrement = (numb) => {
        const alphabet = ["A)", "B)", "C)", "D)", "E)", "F", "G", "H", "I", "J", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        return alphabet[numb];
    }

    function PrecioOferta(props) {

        return (<>
            <Table >
                <tbody>
                    <tr className="dark-text">
                        <td>
                            <strong>

                                Oferta:
                            </strong>
                        </td>
                        <td>
                            
                                {props.cantidadMinima > 1 && (<>

                                    {props.cantidadMinima}X &nbsp;
                                    {props.cantidadMinima <= 1 && (<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)}


                                </>)}
                            
                        </td>
                        <td className="dark-text">
                            <NumberFormat className="card-text price" value={props.precioOferta} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />
                        </td>

                    </tr>
                    <tr>
                        <strong>
                            <td align="left">


                                Antes:

                            </td>
                            <td className="disabled-price">
                                <NumberFormat value={props.precio} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />
                            </td>
                        </strong>
                    </tr>

                </tbody>
            </Table>

            <Card.Text >

            </Card.Text>
            <Card.Text className="card-text disabled-price">

            </Card.Text>
        </>);
    }

    function PrecioNormal(props) {
        return (<>
            <Table>
                <tbody>
                    <tr>

                        <td>
                            <strong>

                                Precio:&nbsp;&nbsp;&nbsp;
                            </strong>
                        </td>
                        <td className="price">
                            <NumberFormat value={props.precio} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'$'} />

                        </td>

                    </tr>
                </tbody>
            </Table>
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
            <div className="outter-borders" onClick={handleClick}>

                {/* <Card style={{ width: '25rem' }}> */}
                <div className="inner-borders">
                    <Card.Title className="purple-text">

                        <strong>
                            <Container>
                                <Row>
                                    <Col className="left-text">{literalIncrement(props.literal)}</Col>
                                    <Col>Generico</Col>
                                    <Col></Col>

                                </Row>
                            </Container>
                        </strong>
                    </Card.Title>
                </div>
                <Card.Img className="img-holder" variant="top" src={props.img} alt={props.cod} />
                <Card.Body>
                    <div className="left-text title">

                        <Card.Text>{props.info}
                            <h3 className="purple-text">{props.nombre}</h3>
                        </Card.Text>
                    </div>
                </Card.Body>
                <br />
                {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                </ListGroup> */}
                <Card.Body >
                    <Container>
                        <Row>
                            <Col>
                            </Col>
                            <Col sm={7}>
                                <Precios cantidadMinima={props.cantidadMinima} precioOferta={props.precioOferta} precio={props.precio} />
                            </Col>
                        </Row>
                    </Container>


                </Card.Body>
                {/* </Card> */}
            </div>

        </>
    );
};

export default CardsB;
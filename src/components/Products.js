import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

export const Products = (props) => {
    //console log props.literal on click event

    const handleClick = () => {
        console.log(props.literal);
    };

    return (
        <>
            <Card onClick={handleClick}>
                <div className="row g-0 align-center">
                    <div className="col-md-4 ">
                        <Row>
                            <Col className="col-md-2 align-center text-center">
                                <h2 className="p-2 purple-text">{props.literal})</h2>
                            </Col>
                            <Col>
                                <Card.Img className="product-image " src="https://picsum.photos/150" />
                            </Col>
                        </Row>

                    </div>
                    <div className="col-md-8">
                        <Card.Body className="card-body">
                            <Container>
                                <Row>
                                    <Col className="left-text">
                                        <Card.Text className="card-text"><small className="text-muted">Marca</small></Card.Text>
                                        <h3 className="purple-text">{props.nombre}</h3>
                                        <Card.Text className="card-text">{props.info}
                                            <br />
                                            <small className="text-muted">{props.tipo}</small></Card.Text>
                                        <Card.Text className="card-text"></Card.Text>
                                    </Col>
                                    <Col className="col-md-2 align-center text-center">
                                            <Card.Text className="card-text price">$10.990</Card.Text>
                                    </Col>
                                </Row>

                            </Container>
                        </Card.Body>
                    </div>
                </div>

            </Card>
        </>
    );
};

export default Products;
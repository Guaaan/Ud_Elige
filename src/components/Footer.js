import React from "react";
import LogoRedfarma from '../img/LogoRedfarma-05.png'
import { Container} from "react-bootstrap";
const Footer = () => {

    return (
        <div className="footer">
            <Container>
                {/* <Row>
                    <Col>
                    </Col>
                    <Col> */}
                        <img className="footer-image"src={LogoRedfarma} width="500" height="333" alt="logo" />
                    {/* </Col>
                </Row> */}
            </Container>
        </div>
    )
}
export default Footer;
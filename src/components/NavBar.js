import React from 'react';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import {
    BrowserRouter as Router
  } from "react-router-dom";

export const NavBar = (props) => {
    return (
        <>
            <Navbar className="color-nav" variant="dark">
                <Container>
                    <Navbar.Brand to="/" href="#home">
                        <img src="https://www.redfarma.cl/img/sitio/logo.png" height="50px" alt="RedFarma Logo" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Router>

                            <Nav.Link href="opcion-a">Opción A</Nav.Link>
                            <Nav.Link href="opcion-b">Opción B</Nav.Link>
                        </Router>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
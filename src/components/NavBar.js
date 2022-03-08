import React from 'react';
import { Navbar, Container, } from 'react-bootstrap';


export const NavBar = () => {
    return (
        <>
            <Navbar className="color-nav" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="https://www.redfarma.cl/img/sitio/logo.png" height="50px" alt="RedFarma Logo" />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
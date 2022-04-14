import React from "react";
import { Carousel } from "react-bootstrap";
import { useFetchData } from "../hooks/useFetchData";
import '../App.css';



export const  ImagesCarousel = (props) => {

    const BASE_URL = 'https://api.redfarma.cl/ud-elige/v0.1/banner/56/CAJA66';
    const { data, loading, error } = useFetchData(BASE_URL); // Guardamos las variables que nos retorna nuestro custom hook, pasanadole como parametro la url de la api, el mensaje del error es opcional
    if (loading) return "Loading ...";
    if (error) return `Error ${error}`;

    return (
        <>
            {data.map((element) => (
                <p key={element.id}>{element.name}</p>
            ))};
            <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://picsum.photos/800/400?random=1"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://picsum.photos/800/400?random=1"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://picsum.photos/800/400?random=1"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default  ImagesCarousel;
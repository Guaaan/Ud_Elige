import React from "react";
import { Card } from "react-bootstrap";

export const Products = (props) => {
    return (
        <>
            <Card>
            <div class="row g-0">
                <div class="col-md-4">
                <Card.Img className="product-image" variant="bottom" src="https://picsum.photos/150/100" />
                </div>
                <div class="col-md-8">
                  <Card.Body class="card-body">
                    <Card.Title>{props.nombre}</Card.Title>
                    <p class="card-text">{props.info}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  </Card.Body>
                </div>
              </div>
                {/* <Card.Img variant="bottom" src="https://picsum.photos/150/100" />
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                </Card.Body> */}
            </Card>
        </>
    );
};

export default Products;
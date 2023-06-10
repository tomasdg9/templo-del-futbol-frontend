/* eslint-disable jsx-a11y/alt-text */
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function CaroucelImg() {
  return (
    <Carousel>
      <Carousel.Item>
      <Link to={`/productos`}>
        <img
          className="d-block w-100 h-100 caroucel-image"
          src="https://templofutbol.vtexassets.com/assets/vtex.file-manager-graphql/images/ca872dc9-d989-4e1d-953e-f055ee77cd3b___1184d39a32ca84cb579f0ca136272a77.jpg"
          alt="First slide"
        />
      </Link>
      </Carousel.Item>
      <Carousel.Item>
      <Link to={`/productos`}>
        <img
          className="d-block w-100 h-100 caroucel-image"
          src="https://templofutbol.vtexassets.com/assets/vtex.file-manager-graphql/images/1a99651a-608c-4bc0-b1a0-28603ccaaf52___be3b3c73ee1a50ee8febd4ea59024a6a.jpg"
        />
      </Link>
      </Carousel.Item>
      <Carousel.Item>
      <Link to={`/productos`}>
        <img
          className="d-block w-100 h-100 caroucel-image"
          src="https://templofutbol.vtexassets.com/assets/vtex.file-manager-graphql/images/e975b242-6715-4cf1-ba95-c6bf6759bcc8___9907c14ea526a2fd6514bf4b11e13e27.jpg"
         />
      </Link>
      </Carousel.Item>
      <Carousel.Item>
      <Link to={`/productos`}>
        <img
          className="d-block w-100 h-100 caroucel-image"
          src="https://templofutbol.vtexassets.com/assets/vtex.file-manager-graphql/images/8cb569a2-932b-4dcd-a7e1-f2d5e1d4b09f___64f0b277f262b14a75e0a2f3ed839250.jpg"
        />
      </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default CaroucelImg;
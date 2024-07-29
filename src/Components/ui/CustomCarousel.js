import React from 'react'
import { Carousel } from 'react-bootstrap';

function CustomCarousel({imgs, captionHeader, captionParagraph}) {
  return (
    <Carousel data-bs-theme="dark">
      {imgs?.map((img, index) => (
        <Carousel.Item key={index} className='p-0'>
          <img
            className="d-block w-100"
            style={{ height: "350px"}}
            src={img?.path}
            alt={index}
          />
          <Carousel.Caption>
            <h5>{captionHeader}</h5>
            <p>{captionParagraph}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CustomCarousel
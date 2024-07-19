import React from 'react'
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import { Container } from 'react-bootstrap'
import Services from '../Components/ui/Services';

function About() {
  return (
    <>
      <Header />
      <Container className="min-vh-100 mt-5">

        <h2 className="mb-5 mt-5 text-center text-lg-start fw-bold text-primary">
          About us
        </h2>
        <h3 className="text-dark fw-bold">Our Story</h3>
        <p>
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p>
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>

        <div className='mt-5 pt-5'>
          <Services />
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default About
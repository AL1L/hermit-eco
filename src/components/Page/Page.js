import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Page = ({ children }) => {
  return <div className="Page">
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Hermit Eco</Navbar.Brand>
      </Container>
    </Navbar>
    <Container>
      {children}
    </Container>
  </div>
};

export default Page;

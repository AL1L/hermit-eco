import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import firebase from 'firebase/app';

const Page = ({ children }) => {
  const auth = firebase.auth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    })
  }, [auth, setCurrentUser]);

  function login() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider);
  }

  function logout() {
    return auth.signOut();
  }

  return <div className="Page">
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Hermit Eco</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {currentUser
              ? <>
                <Navbar.Text>{currentUser.displayName}</Navbar.Text>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
              : <Nav.Link onClick={login}>Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      {children}
    </Container>
  </div>
};

export default Page;

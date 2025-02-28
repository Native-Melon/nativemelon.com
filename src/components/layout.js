import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Image, Navbar, Nav, CloseButton } from "react-bootstrap";

import logo from "../images/logo.png";

const Layout = ({ location, title, children }) => {
  const headerModes = {
    top: {
      bg: 'transparent',
      theme: 'light',
      class: '',
    },
    scrolled: {
      bg: 'dark',
      theme: 'dark',
      class: 'navbar-shrink',
    }
  };
  const [headerMode, setHeaderMode] = useState(location.pathname == "/" ? headerModes.top : headerModes.scrolled);
  let listener = null;

  
  useEffect(() => {
    if (location.pathname == "/") {
      listener = document.addEventListener("scroll", e => {
        const scrolled = document.scrollingElement.scrollTop > 1 ? true : false;
        setHeaderMode(scrolled ? headerModes.scrolled : headerModes.top);
      })
    }
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [headerMode])

  return (
    <div className="global-wrapper">
    {/* Navigation */}
    <Navbar bg={headerMode.bg} data-bs-theme={headerMode.theme}
      fixed="top" expand="md" id="mainNav" className={headerMode.class}>
      <Container>
        <Navbar.Brand href="/#home">
          <Image src={logo} alt="Native Melon Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav activeKey="0">
            <Nav.Link href="/#home">Home</Nav.Link>
            <Nav.Link href="/#services">Services</Nav.Link>
            <Nav.Link href="/#portfolio">Portfolio</Nav.Link>
            <Nav.Link href="/#about">About</Nav.Link>
            <Nav.Link href="/#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* Content */}
    <div className={location.pathname == "/" ? '' : 'generic-page-content'}>
      {children}
    </div>
    {/* Footer */}
    <footer className="footer py-4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-4 text-lg-start">{new Date().getFullYear()} Native Melon &copy;</div>
                <div className="col-lg-4 my-3 my-lg-0">
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="col-lg-4 text-lg-end">
                    <a className="link-dark text-decoration-none me-3" href="/privacy-policy">Privacy Policy</a>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
};

export default Layout;

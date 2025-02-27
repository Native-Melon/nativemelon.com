import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Image, Navbar, Nav } from "react-bootstrap";

import logo from "../images/logo.png";

const Layout = ({ location, title, children }) => {
  const [scrolled, setScrolled] = useState(false);
  let listener = null;

  
  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      setScrolled(document.scrollingElement.scrollTop > 1 ? true : false);
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrolled])

  return (
    <div className="global-wrapper">
    {/* Navigation */}
    <Navbar bg={scrolled ? "dark" : "transparent"} data-bs-theme={scrolled ? "dark" : "light"}
      fixed="top" expand="md" id="mainNav" className={scrolled ? "navbar-shrink" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <Image src={logo} alt="Native Melon Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav activeKey="0">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#portfolio">Portfolio</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* Content */}
    {children}
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
                    <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                    <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
};

export default Layout;

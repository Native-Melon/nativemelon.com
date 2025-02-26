import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Image, Navbar, Nav } from "react-bootstrap";

import logo from "../images/logo.png";

const handleSelect = (e, ek) => console.log(e);

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
    <Navbar bg={scrolled ? "dark" : "transparent"} data-bs-theme={scrolled ? "dark" : "light"} fixed="top" expand="md" id="mainNav">
      <Container>
        <Navbar.Brand href="#home" eventKey={0}>
          <Image src={logo} alt="Native Melon Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav activeKey="0">
            <Nav.Link eventKey={0} href="#home">Home</Nav.Link>
            <Nav.Link eventKey={1} href="#services">Services</Nav.Link>
            <Nav.Link eventKey={2} href="#portfolio">Portfolio</Nav.Link>
            <Nav.Link eventKey={3} href="#about">About</Nav.Link>
            <Nav.Link eventKey={4} href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* Content */}
    {children}
    {/* Footer */}
    <footer class="footer py-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 text-lg-start">{new Date().getFullYear()} Native Melon &copy;</div>
                <div class="col-lg-4 my-3 my-lg-0">
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <div class="col-lg-4 text-lg-end">
                    <a class="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                    <a class="link-dark text-decoration-none" href="#!">Terms of Use</a>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
};

export default Layout;

import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Image, Navbar, Nav } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Layout = ({ location, title, children }) => {
  const headerModes = {
    top: {
      bg: 'transparent',
      theme: 'dark',
      class: '',
    },
    scrolled: {
      bg: 'dark',
      theme: 'dark',
      class: 'navbar-shrink',
    }
  };

  const [headerMode, setHeaderMode] = useState(headerModes.top);
  let listener = null;

  
  useEffect(() => {
    const getDefaultHeaderMode = () => {
      const isHome = location.pathname == "/";
      const isScrolled = document.scrollingElement.scrollTop > 1;
      return (!isHome || isMobile || isScrolled) ? headerModes.scrolled : headerModes.top;
    }
    setHeaderMode(getDefaultHeaderMode());

    if (location.pathname == "/") {
      listener = document.addEventListener("scroll", e => {
        const scrolled = document.scrollingElement.scrollTop > 1 ? true : false;
        setHeaderMode(scrolled ? headerModes.scrolled : getDefaultHeaderMode());
      })
    }
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [])

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
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter">
                      <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
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

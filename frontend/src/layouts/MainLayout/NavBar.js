import { useState, useEffect } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Link } from "react-router-dom"
import AuthWidget from "./AuthWidget"
import "./styles.css"


export default function NavBar(){
    const [expanded, setExpanded] = useState(false)

    // navbar scroll animation 
    useEffect(() => {
        // need to refactor with usage of useCallback and useRef
        const handleNavbarScroll = () => {
            const currentScrollY = window.scrollY
            const threshold = 56  // min scroll to hide navbar
            const _navbar = document.querySelector(".navbar")

            if(currentScrollY < threshold){
                return 
            }

            if(currentScrollY < prevScrollY){
                _navbar.classList.remove('scrolled-down');
                _navbar.classList.add('scrolled-up');
            }
            else if(currentScrollY > prevScrollY){
                _navbar.classList.remove('scrolled-up');
                _navbar.classList.add('scrolled-down');
            }

            prevScrollY = currentScrollY
        }

        var prevScrollY = 0
        window.addEventListener("scroll", handleNavbarScroll)
        return () => {window.removeEventListener("scroll", handleNavbarScroll)}
    }, [])

    // smooth navbar scroll down on page load
    useEffect(() =>{
        const _navbar = document.querySelector(".navbar")
        _navbar.classList.remove('scrolled-down');
        _navbar.classList.add('scrolled-up');
    }, [])

    const handleLinkClick = e => setExpanded(false)

    return (
        <Navbar className="scrolled-down" sticky="top" expanded={expanded} expand="md" bg="white" data-bs-theme="light">
            <Container fluid className="mx-md-3">
                <Navbar.Toggle 
                    style={{border: "none"}} 
                    className="p-0" 
                    aria-controls="offcanvas"
                    onClick={e => setExpanded(!expanded)}
                />
                <Navbar.Brand as={Link} to="/" className="me-auto ps-2 fs-5">Psycholebedenko</Navbar.Brand>
                <Navbar.Offcanvas id="offcanvas" aria-labelledby="offcanvas-label" placement="top">
                    <Offcanvas.Header>
                        {/* default  header closeButton is not working because router Link doesn't close offcanvas */}
                        <button
                            onClick={e => setExpanded(!expanded)} 
                            type="button" 
                            className="btn-close text-reset p-3 ms-auto" 
                            data-bs-dismiss="offcanvas" 
                            aria-label="Close"
                        />
                    </Offcanvas.Header>
                    <Offcanvas.Body 
                        as={Nav} 
                        variant="underline" 
                        className="justify-content-md-end justify-content-center flex-grow-1 pe-3 text-center"
                    >
                        <Nav.Link onClick={handleLinkClick} as={Link} to="/appointment">консультація</Nav.Link>
                        <Nav.Link onClick={handleLinkClick} as={Link} to="/event">івенти</Nav.Link>
                        <Nav.Link onClick={handleLinkClick} as={Link} to="/contacts">про мене</Nav.Link>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Nav>
                    <AuthWidget />
                </Nav>
            </Container>
        </Navbar>
    )
}
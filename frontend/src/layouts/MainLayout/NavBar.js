import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Link } from "react-router-dom"
import AuthWidget from "./AuthWidget"
import { useEffect } from "react"

const styles = {
    navbar: {
        height: "6vh",
        borderBottom: "solid 1px #ebebeb",
    },
    offcanvas: {
        width: "100%"
    },
}

export default function NavBar(){
    return (
        <Navbar sticky="top" expand="md" bg="white" data-bs-theme="light" style={styles.navbar}>
            <Container fluid className="mx-md-3 mx-1">
                <Navbar.Toggle style={{border: "none"}} className="ps-0" aria-controls="offcanvas"/>
                <Navbar.Brand as={Link} to="/" className="me-auto ps-2 fs-5">Psycholebedneko</Navbar.Brand>
                <Navbar.Offcanvas style={styles.offcanvas} id="offcanvas" aria-labelledby="offcanvas-label" placement="start">
                    <Offcanvas.Header closeButton />
                    <Offcanvas.Body as={Nav} variant="underline" className="justify-content-md-end justify-content-center flex-grow-1 pe-3 text-center">
                        <Nav.Link href="#consulting">консультація</Nav.Link>
                        <Nav.Link href="#events">івенти</Nav.Link>
                        <Nav.Link href="#about">про мене</Nav.Link>
                        <Nav.Link href="#contacts">контакти</Nav.Link>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Nav className="ms-3">
                    <AuthWidget />
                </Nav>
            </Container>
        </Navbar>
    )
}
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Link } from "react-router-dom"
import AuthWidget from "./AuthWidget"

const styles = {
    navbar: {
        height: "56px",
        borderBottom: "solid 1px #ebebeb"
    },
    offcanvas: {
        width: "100%"
    }
}

export default function NavBar(){
    return (
        <Navbar expand="lg" bg="white" data-bs-theme="light" style={styles.navbar}>
            <Container fluid className="mx-lg-3 mx-1">
                <Navbar.Toggle aria-controls="offcanvas"/>
                <Navbar.Brand className="me-auto ps-2 fs-5">Psycholebedneko</Navbar.Brand>
                <Navbar.Offcanvas styles={styles.offcanvas} id="offcanvas" aria-labelledby="offcanvas-label" placement="start">
                    <Offcanvas.Header closeButton />
                    <Offcanvas.Body as={Nav} className="justify-content-center flex-grow-1 pe-3">
                        <Nav.Link>консультація</Nav.Link>
                        <Nav.Link>івенти</Nav.Link>
                        <Nav.Link>про мене</Nav.Link>
                        <Nav.Link>контакти</Nav.Link>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Nav className="text-center">
                    <AuthWidget />
                </Nav>
            </Container>
        </Navbar>
    )
}


{/* <Navbar expand="lg" bg="white" data-bs-theme="light" style={styles.navbar}>
            <Container fluid className="mx-lg-5 mx-3 p-0" style={{height: "inherit"}}>
                <Navbar.Toggle className="me-1" aria-controls="offcanvas"/>
                <Navbar.Brand as={Link} to="/" className="me-auto fs-4">Psycholebedneko</Navbar.Brand>
                <Navbar.Offcanvas style={{width:"100%"}} id="offcanvas" aria-labelledby="offcanvas-label" placement="start">
                    <Offcanvas.Header closeButton/>
                    <Offcanvas.Body className="">
                        <Nav className="mx-auto fs-6 py-2 text-center" style={{height: "56px"}}>
                            <Nav.Link>консультація</Nav.Link>
                            <Nav.Link>івенти</Nav.Link>
                            <Nav.Link>про мене</Nav.Link>
                            <Nav.Link>контакти</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Nav>
                    <AuthWidget />
                </Nav>
            </Container>
        </Navbar> */}
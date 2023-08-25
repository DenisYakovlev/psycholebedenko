import Navbar from "react-bootstrap/Navbar"
import OffCanvas from "./OffCanvas"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"



export default function NavBar(){
    const [showMenu, setShowMenu] = useState(false)

    return (
        <Navbar 
            style={{
                height: "64px", 
                borderBottom: "solid 1px var(--bs-gray-400)"
            }}
            className="m-0 p-0 position-relative justify-content-between" 
            bg="white" 
            fixed="top" 
            expand="md"
        >
            <Navbar.Toggle onClick={() => setShowMenu(true)} className="ms-2"/>

            <Navbar.Text as={Link} to="/admin" className="ms-md-4 ms-0 p-0 fs-3 fw-semibold text-dark text-decoration-none">
                Адмінська Панель
            </Navbar.Text>

            <Navbar.Text as={Link} to="/" className="m-0 pe-3 fs-4 text-dark text-decoration-none">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="p-0"/>
            </Navbar.Text>

            <OffCanvas show={showMenu} onHide={() => setShowMenu(false)}/>

        </Navbar>
    )
}
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

export default function MenuHelp(){
    return (
        <Container style={{height: "75vh"}} className="d-sm-none d-flex justify-content-center align-items-center" fluid>
            <p className="m-0 p-0 fs-4 text-dark text-center w-75">
                Натисніть на <b><FontAwesomeIcon icon={faBars}/> Меню</b> для пошуку і фільтрації даних...
            </p> 
        </Container>
    )
}
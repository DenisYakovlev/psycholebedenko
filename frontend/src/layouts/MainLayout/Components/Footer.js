import Container from "react-bootstrap/Container"
import Credentials from "../../../pages/Home/Consulting/Credentials"
import { Link } from "react-router-dom"


export default function Footer(){
    return (
        <Container 
            style={{height: "fit-content", backgroundColor: "#f4f4f4"}} 
            className="px-0 pt-4 pb-1 border-top border-muted d-flex flex-column justify-content-center align-items-center" 
            fluid
        >
            <Credentials />
            <p className="m-0 p-0 text-center fs-6 text-muted fw-semibold text-center">
                @2023 Psycholebedenko | <Link to="#" className="p-0 text-decoration-none text-muted fw-semibold">Угода користувача</Link>
            </p>
        </Container>
    )
}
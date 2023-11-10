import Container from "react-bootstrap/Container"
import Credentials from "../../../pages/Home/Consulting/Credentials"
import { Link } from "react-router-dom"


export default function Footer(){
    const handleTermsRedirect = () => {
        window.open('https://telegram.org/privacy/ua', '_blank')
    }

    const handleCreatorGithubRedirect = () => {
        window.open('https://github.com/DenisYakovlev', '_blank')
    }

    return (
        <Container 
            style={{height: "fit-content", backgroundColor: "#f4f4f4"}} 
            className="px-0 pt-4 pb-1 border-top border-muted d-flex flex-column justify-content-center align-items-center" 
            fluid
        >
            <Credentials />

            <Container className="p-0 d-flex justify-content-center gap-1" fluid>
                <p onClick={handleCreatorGithubRedirect} style={{cursor: "pointer"}} className="m-0 p-0 fs-6 text-muted fw-semibold">
                    Created by Denis Yakovlev | 
                </p>
                <Link onClick={handleTermsRedirect} className="p-0 text-decoration-none text-muted fw-semibold">Угода користувача</Link>
            </Container>
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import { Helmet } from "react-helmet"


export default function Exit(){
    return (
        <Container className="p-0 vh-100 fs-1 d-flex justify-content-center align-items-center" fluid>
            <Helmet>
                <title>Як вийти</title>
            </Helmet>

            У розробці
        </Container>
    )
}
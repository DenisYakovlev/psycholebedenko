import Container from "react-bootstrap/Container"
import { Helmet } from "react-helmet"

export default function Tests(){
    return (
        <Container fluid="lg" className="p-0 vh-100 fs-1 d-flex justify-content-center align-items-center">
            <Helmet>
                <title>Тести</title>
            </Helmet>

            У розробці
        </Container>
    )
}
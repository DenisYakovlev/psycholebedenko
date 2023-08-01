import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/esm/Container"

export default function LoadSpinner(){
    return (
        <Container className="m-0 vh-100 w-100 d-flex justify-content-center align-items-center" fluid>
            <Spinner animation="border"/>
        </Container>
    )
}
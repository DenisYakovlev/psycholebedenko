import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";

// import "./ConsultingButton.css"

export default function ConsultingButton(){
    return (
        <Container className="m-0 d-flex flex-column align-items-center justify-content-end gap-3 main-button-wrapper">
            <Button as={Link} to="/appointment" className="align-self-center main-button" variant="outline-light p-xl-3" size="lg">
                ЗАПИСАТИСЯ
            </Button>
            <p style={{fontSize: "8px"}} >какой-то текст еще тут</p>
        </Container>
    )
}
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";

// import "./ConsultingButton.css"

export default function ConsultingButton(){
    return (
        <Container className="m-0 d-flex flex-column align-items-center justify-content-end gap-3">
            <Button as={Link} to="/appointment" className="align-self-center main-button" variant="outline-light p-xl-3" size="lg">
                ЗАПИСАТИСЯ
            </Button>
            <p style={{fontSize: "8px"}} >какая-то хуйня еще тут</p>
        </Container>
    )
}
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import "./styles.css"


export default function ConsultingButton({source}){
    return (
        <Container className="m-0 pb-5 d-flex flex-column align-items-center justify-content-end gap-3 main-button-wrapper">
            <Button 
                as={Link} to={`appointment/create`}
                className="align-self-center main-button" 
                variant="outline-light p-xl-3" size="lg"
            >
                ЗАПИСАТИСЯ
            </Button>
            {/* <p style={{fontSize: "8px"}} >
                какой-то текст под кнопкой
            </p> */}
        </Container>
    )
}
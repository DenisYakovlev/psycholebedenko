import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export default function ResultModal({show, hide}){
    let navigate = useNavigate()

    const hadnleClick = () => {
        hide()
        navigate("/")
    }

    return (
        <Modal
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="md" show={show} onHide={hide} 
            animation={true} centered
            onExit={hide}
        >
            <Modal.Body className="m-0 px-3">
                <Container style={{ fontSize: "36px"}} className="m-0 mt-3 p-0 text-success d-flex d-row gap-3 align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    Записано!
                </Container>
                <Container className="p-0 m-0">
                    <p className="p-0 text-muted text-center fs-5">
                        Какой-то текст про запись
                    </p>
                </Container>
                <Container className="p-0 mt-5 mb-3 d-flex justify-content-center">
                    <Button variant="outline-dark" size="lg" onClick={hadnleClick}>
                        Продовжити
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
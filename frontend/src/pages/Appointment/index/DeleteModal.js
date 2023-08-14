import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"


export default function DeleteModal({show, hide}){
    const handleClick = () => {
        return "yes"
    }

    return (
        <Modal
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="md" show={show} onHide={hide} 
            animation={true} centered
            onExit={hide}
        >
            <Modal.Body>
                <Container className="m-0 p-0 d-flex flex-column justify-content-center align-items-center">
                    <p className="m-0 p-0 fs-3 text-muted text-center">
                        Відмінити запис?
                    </p>
                    <Button variant="outline-dark" size="md">
                        Так
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
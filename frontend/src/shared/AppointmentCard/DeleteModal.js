import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"


export default function DeleteModal({show, hide, handleDelete}){
    const _handleClick = () => {
        handleDelete()
        hide()
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
                <Container className="my-5 p-0 d-flex flex-column justify-content-center align-items-center">
                    <p className="mb-3 p-0 fs-3 text-muted text-center">
                        Відмінити запис?
                    </p>
                    <Container className="m-0 p-0 d-flex flex-row justify-content-center gap-3">
                        <Button onClick={hide} variant="outline-dark" size="md">
                            Ні
                        </Button>
                        <Button onClick={_handleClick} variant="outline-dark" size="md">
                            Так
                        </Button>
                    </Container>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
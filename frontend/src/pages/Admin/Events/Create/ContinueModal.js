import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import CloseButton from "react-bootstrap/CloseButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"


export default function ContinueModal({show, hide, onAccept, onDecline}){
    const handleAccept = () =>{
        onAccept()
        hide()
    }

    const handleDecline = () =>{
        onDecline()
        hide()
    }

    return (
        <Modal
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="md" show={show} onHide={hide} 
            animation={true} centered
            onExit={handleDecline}
        >
            <Container className="pe-3 pt-3 d-flex justify-content-end" fluid>
                <CloseButton onClick={hide}/>
            </Container>
            <Modal.Body className="m-0 p-5 d-flex flex-column gap-4 justify-content-center align-items-center">
                <Container className="p-0 d-flex flex-column gap-3">
                    <FontAwesomeIcon icon={faCircleExclamation} style={{fontSize: "64px"}} className="p-0 text-dark"/>
                    <p className="p-0 fs-3 text-dark fw-semibold text-center lh-sm">
                        Є збережені дані.<br/> 
                        Продовжити роботу?
                    </p>
                </Container>    

                <Container className="p-0 d-flex flex-row justify-content-center gap-5">
                    <Button variant="outline-dark" size="md" className="px-5 fs-5" onClick={handleDecline}>
                        Ні
                    </Button>
                    <Button variant="outline-dark" size="md" className="px-5 fs-5" onClick={handleAccept}>
                        Так
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
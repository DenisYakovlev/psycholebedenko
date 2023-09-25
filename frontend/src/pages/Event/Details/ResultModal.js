import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import CloseButton from "react-bootstrap/CloseButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function ResultModal({show, hide, resultType}){
    const handleExit = () => {
        hide()
    }

    return (
        <Modal
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="md" show={show} onHide={hide} 
            animation={true} centered
            onExited={handleExit}
        >
            <Container className="pe-3 pt-3 d-flex justify-content-end" fluid>
                <CloseButton onClick={hide}/>
            </Container>

            <Modal.Body className="m-0 px-3">
                {
                    resultType == "success-on" || "success-off" ?
                        <Container style={{ fontSize: "36px"}} className="m-0 mt-3 p-0 d-flex text-success d-row gap-3 align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faCircleCheck} />
                            Успішно!
                        </Container>
                        :
                        <Container style={{ fontSize: "36px"}} className="m-0 mt-3 p-0 d-flex text-danger d-row gap-3 align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faCircleXmark} />
                            Спробуйте пізніше
                        </Container>
                }
                <Container className="p-0 m-0">
                    <p className="p-0 text-muted text-center fs-5">
                        {resultType == "success-on" ? "Ви записались на групову зустріч" 
                        : resultType == "success-off" ? "Ви відписались від групової зустрічі"
                        : "Виникла помилка"}
                    </p>
                </Container>
                <Container className="p-0 my-5 d-flex justify-content-center">
                    <Button variant="outline-dark" size="lg" onClick={handleExit}>
                        Продовжити
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
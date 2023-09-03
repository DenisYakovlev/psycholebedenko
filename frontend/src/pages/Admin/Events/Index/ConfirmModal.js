import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { backend_url } from "../../../../constants"
import { useContext } from "react"
import { UserContext } from "../../../../contexts"


export default function ConfirmModal({show, hide, event}){
    const {authFetch} = useContext(UserContext)

    const hadnleClick = () => {
        authFetch(`${backend_url}/event/${event.id}/manage`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.ok){
                hide()
                return
            }

            throw new Error("Admin event delete error")
        })
        .catch(error => console.log(error))
    }

    return (
        <Modal
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="md" show={show} onHide={hide} 
            animation={true} centered
            onExit={hide}
        >
            <Modal.Body className="m-0 px-3 py-5">
                <Container className="p-0 m-0">
                    <p className="p-0 text-muted text-center fs-4">
                        Відмінити групову зустріч?
                    </p>
                </Container>
                <Container className="p-0 mt-5 mb-3 d-flex justify-content-center gap-3">
                    <Button variant="outline-dark" size="lg" onClick={hide}>
                        Ні
                    </Button>
                    <Button variant="outline-dark" size="lg" onClick={hadnleClick}>
                        Так
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
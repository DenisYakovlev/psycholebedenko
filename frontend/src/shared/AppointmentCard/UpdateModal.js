import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import DatePicking from "../../pages/Appointment/create/DatePicking"
import CloseButton from "react-bootstrap/esm/CloseButton"
import { useState } from "react"


export default function UpdateModal({show, hide, handleUpdate}){
    const [date, setDate] = useState(null)

    const submitDate = (date) => {
        setDate(date)
        handleUpdate({date: date.id})
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
            <Container className="pe-3 pt-3 d-flex justify-content-end" fluid>
                <CloseButton onClick={hide}/>
            </Container>

            <Modal.Body className="m-0 px-0 pt-3 pb-5">
                <DatePicking sumbitDate={submitDate}/>
            </Modal.Body>
        </Modal>
    )
}
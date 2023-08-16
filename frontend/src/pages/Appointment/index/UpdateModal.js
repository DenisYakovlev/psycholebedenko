import Modal from "react-bootstrap/Modal"
import DatePicking from "../create/DatePicking"
import { useState } from "react"


export default function UpdateModal({show, hide, appointment, handleUpdate}){
    const [date, setDate] = useState(null)

    const submitDate = (date) => {
        setDate(date)
        handleUpdate(appointment, {date: date.id})
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
            <Modal.Body className="m-3">
                <DatePicking sumbitDate={submitDate}/>
            </Modal.Body>
        </Modal>
    )
}
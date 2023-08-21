import Modal from "react-bootstrap/Modal"
import DatePicking from "../../pages/Appointment/create/DatePicking"
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
            <Modal.Body className="m-0 px-0 py-5">
                <DatePicking sumbitDate={submitDate}/>
            </Modal.Body>
        </Modal>
    )
}
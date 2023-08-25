import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { useState } from "react"


export default function StatusModal({show, hide, handleStatusUpdate}){
    const [status, setStatus] = useState("")

    const _handleClick = () => {
        handleStatusUpdate({status: status})
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
                <p className="m-0 p-0 text-center text-muted fs-6">
                    Вкажіть новий статус
                </p>
                <Form className="my-3 mx-5 px-5">
                    <Form.Check >
                        <Form.Check.Input 
                            value="pending" 
                            onChange={e => setStatus(e.target.value)}  
                            name="status-group" 
                            type="radio" 
                            id="status-pending"
                        />
                        <Form.Check.Label htmlFor="status-pending">в обробці</Form.Check.Label>
                    </Form.Check>

                    <Form.Check>
                        <Form.Check.Input 
                            value="appointed" 
                            onChange={e => setStatus(e.target.value)}  
                            name="status-group" 
                            type="radio" 
                            id="status-appointed"
                        />
                        <Form.Check.Label htmlFor="status-appointed">назначено</Form.Check.Label>
                    </Form.Check>

                    <Form.Check>
                        <Form.Check.Input 
                            value="complete" 
                            onChange={e => setStatus(e.target.value)}
                            name="status-group" 
                            type="radio" 
                            id="status-complete"
                        />
                        <Form.Check.Label htmlFor="status-complete">виконано</Form.Check.Label>
                    </Form.Check>

                    <Form.Check>
                        <Form.Check.Input 
                            value="denied" 
                            onChange={e => setStatus(e.target.value)}  
                            name="status-group" 
                            type="radio" 
                            id="status-denied"
                        />
                        <Form.Check.Label htmlFor="status-denied">відмінено</Form.Check.Label>
                    </Form.Check>
                </Form>

                <Container className="my-3 p-0 d-flex justify-content-center">
                    <Button onClick={_handleClick} variant="outline-dark" size="md">
                        Змінити
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
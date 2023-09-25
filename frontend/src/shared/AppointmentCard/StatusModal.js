import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import CloseButton from "react-bootstrap/CloseButton"
import { useState } from "react"


export default function StatusModal({show, hide, handleStatusUpdate}){
    const [status, setStatus] = useState("pending")
    const [createZoom, setCreateZoom] = useState(false)

    const _handleClick = () => {
        handleStatusUpdate({
            status: status,
            create_zoom_link: createZoom
        })
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

            <Modal.Body className="m-0 px-0 pt-5">
                <p className="m-0 p-0 text-center text-dark fw-bold fs-4">
                    Вкажіть новий статус
                </p>
                <Form.Group className="my-3 mx-5 px-4">
                    <Form.Check>
                        <Form.Check.Input 
                            value="pending" 
                            onChange={e => setStatus(e.target.value)}  
                            defaultChecked={true}
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
                </Form.Group>

                <p className="my-3 p-0 text-center text-dark fw-bold fs-4">
                    Створити/перестворити міт<br/> у Зумі?
                </p>                

                <Form.Group className="my-3 mx-5 px-4">
                    <Form.Check>
                        <Form.Check.Input 
                            value={true}
                            onChange={e => setCreateZoom(e.target.value)}
                            name='state-group'
                            type='radio'
                            id='state-true'
                        />
                        <Form.Check.Label htmlFor="state-true">Так</Form.Check.Label>
                    </Form.Check>
                    <Form.Check>
                        <Form.Check.Input 
                            value={false}
                            onChange={e => setCreateZoom(e.target.value)}
                            name='state-group'
                            type='radio'
                            id='state-false'
                        />
                        <Form.Check.Label htmlFor="state-false">Ні</Form.Check.Label>
                    </Form.Check>
                </Form.Group>

                <Container className="mt-5 mb-3 p-0 d-flex justify-content-center">
                    <Button onClick={_handleClick} variant="outline-dark" size="md">
                        Змінити
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
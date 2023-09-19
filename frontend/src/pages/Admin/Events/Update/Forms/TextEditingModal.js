import Modal from "react-bootstrap/Modal"
import CloseButton from "react-bootstrap/CloseButton"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"


export default function TextEditingModal({show, hide, text, setText}){
    return (
        <Modal
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="xl" show={show} onHide={hide} 
            animation={true} centered
            onExit={hide}
        >
            <Modal.Body className="my-3 px-3">
                <Container className="p-0 d-flex flex-column gap-3">
                    <Container className="p-0 d-flex justify-content-between">
                        <p className="m-0 p-0 text-muted fs-5 text-justify ">
                            Введіть текст
                        </p>

                        <CloseButton onClick={hide}/>
                    </Container>

                    <Form.Control
                        className="text-break"
                        value={text}
                        onChange={setText}
                        as="textarea" style={{height: "fit-content", minHeight: "80vh"}}
                    />
                </Container>
            </Modal.Body>
        </Modal>
    )
}
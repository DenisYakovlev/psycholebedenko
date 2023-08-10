import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function NotesForm(){
    return (
        <Container className="px-3 mt-3 d-flex flex-column gap-1">
            <p className="p-0 m-0 mb-0 text-muted text-center fs-6">
                Розкажіть про себе(или что-то другое)
            </p>

            <Form className="m-0 p-0">
                <Form.Group>
                    <Form.Label>
                    </Form.Label>
                    <Form.Control style={{height: "30vh"}} as="textarea" placeholder="Можна не заповнювати"/>
                </Form.Group>
            </Form>
            <Button
                // onClick={handleSubmit}
                className="my-5 w-50 align-self-center" variant="outline-dark" size="lg"
            >
                Записатися
            </Button>
        </Container>
    )
}
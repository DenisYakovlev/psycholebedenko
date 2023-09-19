import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


export default function NotesForm({nextSlide, notes, setNotes}){
    return (
        <Container className="px-3 mt-3 d-flex flex-column gap-1">
            <p className="p-0 m-0 mb-0 text-muted text-center fs-6">
                Нотатки
            </p>

            <Form className="m-0 p-0">
                <Form.Group>
                    <Form.Label>
                    </Form.Label>
                    <Form.Control 
                        value={notes} onChange={e => setNotes(e.target.value)} 
                        style={{height: "30vh", minHeight: "200px"}} as="textarea" placeholder="Можна не заповнювати"
                    />
                </Form.Group>
            </Form>
            <Button
                onClick={nextSlide}
                className="mt-4 mb-3 w-50 align-self-center" variant="outline-dark" size="md"
            >
                Продовжити
            </Button>
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { TextEditingTag } from "../../../shared"



export default function NotesForm({nextSlide, notes, setNotes}){
    return (
        <Container className="px-3 mt-3 d-flex flex-column gap-1">
            <p className="m-0 p-0 text-center text-muted fs-6">
                Нотатки
            </p>


            <Form.Group className="py-3">
                <Container className="mb-2 px-1 d-flex justify-content-end">
                    <TextEditingTag 
                        text={notes}
                        onChange={e => setNotes(e.target.value)}
                    />
                </Container>

                <Form.Control 
                    value={notes} onChange={e => setNotes(e.target.value)} 
                    style={{height: "30vh", minHeight: "200px"}} as="textarea" placeholder="Можна не заповнювати"
                />
            </Form.Group>

            <Button
                onClick={nextSlide}
                className="mt-4 mb-3 w-50 align-self-center" variant="outline-dark" size="md"
            >
                Продовжити
            </Button>
        </Container>
    )
}
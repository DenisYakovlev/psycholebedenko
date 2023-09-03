import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"


export default function NotesForm({notes, setNotes}){
    return (
        <Container className="m-0 p-0">
            <Form.Group>
                <Form.Control 
                    value={notes} onChange={e => setNotes(e.target.value)} 
                    style={{height: "30vh", minHeight: "200px"}} as="textarea" placeholder="Можна не заповнювати"
                />
            </Form.Group>
        </Container>
    )
}
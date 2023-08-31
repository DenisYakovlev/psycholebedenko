import Form from "react-bootstrap/Form"


export default function NotesForm({notes, setNotes}){
    return (
        <Form className="m-0 p-0">
            <Form.Group>
                <Form.Control 
                    value={notes} onChange={e => setNotes(e.target.value)} 
                    style={{height: "30vh", minHeight: "200px"}} as="textarea" placeholder="Можна не заповнювати"
                />
            </Form.Group>
        </Form>
    )
}
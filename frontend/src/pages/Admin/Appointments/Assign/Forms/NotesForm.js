import Form from "react-bootstrap/Form"


export default function NotesForm({notes, onChange}){
    return (
        <Form.Control 
            value={notes} 
            onChange={onChange} 
            style={{height: "30vh", minHeight: "200px"}} 
            as="textarea" 
            placeholder="Можна не заповнювати"
        />
    )
}
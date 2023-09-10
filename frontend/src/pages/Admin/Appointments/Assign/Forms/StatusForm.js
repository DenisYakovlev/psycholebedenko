import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"


export default function StatusForm({status, onChange}){
    return (
        <Container className="p-0" fluid>
            <Form.Check >
                <Form.Check.Input 
                    value="pending"
                    defaultChecked={status == "pending"}
                    onChange={onChange}  
                    name="status-create-group" 
                    type="radio" 
                    id="status-create-pending"
                />
                <Form.Check.Label htmlFor="status-create-pending">в обробці</Form.Check.Label>
            </Form.Check>

            <Form.Check>
                <Form.Check.Input 
                    value="appointed" 
                    defaultChecked={status == "appointed"}
                    onChange={onChange}  
                    name="status-create-group" 
                    type="radio" 
                    id="status-create-appointed"
                />
                <Form.Check.Label htmlFor="status-create-appointed">назначено</Form.Check.Label>
            </Form.Check>

            <Form.Check>
                <Form.Check.Input 
                    value="complete" 
                    defaultChecked={status == "complete"}
                    onChange={onChange}  
                    name="status-create-group" 
                    type="radio" 
                    id="status-create-complete"
                />
                <Form.Check.Label htmlFor="status-create-complete">виконано</Form.Check.Label>
            </Form.Check>
        </Container>
    )
}
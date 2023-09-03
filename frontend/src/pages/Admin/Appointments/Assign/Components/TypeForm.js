import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/esm/Container"


export default function TypeForm({type, setType}){
    return (
        <Container>
            <Form.Check>
                <Form.Check.Input 
                    value={true} 
                    defaultChecked={true}
                    onChange={(e) => setType(e.target.value)}  
                    name="create-type-form"
                    type="radio" 
                    id="create-type-form-online"
                />
                <Form.Check.Label htmlFor="create-type-form-online">
                    Онлайн
                </Form.Check.Label>
            </Form.Check>
            <Form.Check>
                <Form.Check.Input 
                    value={false} 
                    onChange={e => setType(e.target.value)}  
                    name="create-type-form"
                    type="radio" 
                    id="create-type-form-offline"
                />
                <Form.Check.Label htmlFor="create-type-form-offline">
                    Оффлайн
                </Form.Check.Label>
            </Form.Check>
        </Container>
    )
}
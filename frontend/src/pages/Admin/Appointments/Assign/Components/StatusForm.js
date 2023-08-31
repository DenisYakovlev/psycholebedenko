import Form from "react-bootstrap/Form"


export default function StatusForm({status, setStatus}){
    return (
        <Form>
            <Form.Check >
                <Form.Check.Input 
                    value="pending"
                    defaultChecked={true}
                    onChange={e => setStatus(e.target.value)}  
                    name="status-create-group" 
                    type="radio" 
                    id="status-create-pending"
                />
                <Form.Check.Label htmlFor="status-create-pending">в обробці</Form.Check.Label>
            </Form.Check>

            <Form.Check>
                <Form.Check.Input 
                    value="appointed" 
                    onChange={e => setStatus(e.target.value)}  
                    name="status-create-group" 
                    type="radio" 
                    id="status-create-appointed"
                />
                <Form.Check.Label htmlFor="status-create-appointed">назначено</Form.Check.Label>
            </Form.Check>

            <Form.Check>
                <Form.Check.Input 
                    value="complete" 
                    onChange={e => setStatus(e.target.value)}
                    name="status-create-group" 
                    type="radio" 
                    id="status-create-complete"
                />
                <Form.Check.Label htmlFor="status-create-complete">виконано</Form.Check.Label>
            </Form.Check>
        </Form>
    )
}
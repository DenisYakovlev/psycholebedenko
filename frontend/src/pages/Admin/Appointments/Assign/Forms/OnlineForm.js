import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"


export default function OnlineForm({online, onChange}){
    return (
        <Container className="p-0" fluid>
            <Form.Check>
                <Form.Check.Input
                    value={true}
                    onClick={onChange}
                    type="radio"
                    name="admin-appointment-create-online"
                    defaultChecked={online}
                    id="admin-appointment-create-online"
                />
                <Form.Check.Label
                    htmlFor="admin-appointment-create-online"
                >
                    Онлайн
                </Form.Check.Label>
            </Form.Check>
            <Form.Check>
                <Form.Check.Input
                    value={false}
                    onClick={onChange}
                    type="radio" 
                    name="admin-appointment-create-online"
                    defaultChecked={!online}
                    id="admin-appointment-create-offline"
                />
                <Form.Check.Label
                    htmlFor="admin-appointment-create-offline"
                >
                    Оффлайн
                </Form.Check.Label>
            </Form.Check>
        </Container> 
    )  
}
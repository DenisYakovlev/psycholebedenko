import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"


export default function OnlineForm({online, onChange}){
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть формат зустрічі
            </FormTitle>

            <Container className="px-3">
                <Form.Check>
                    <Form.Check.Input
                        value={true}
                        onClick={onChange}
                        type="radio"
                        name="admin-event-update-online"
                        defaultChecked={online}
                        id="admin-event-update-online"
                    />
                    <Form.Check.Label
                        htmlFor="admin-event-update-online"
                    >
                        Онлайн
                    </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input
                        value={false}
                        onClick={onChange}
                        type="radio" 
                        name="admin-event-update-online"
                        defaultChecked={!online}
                        id="admin-event-update-offline"
                    />
                    <Form.Check.Label
                        htmlFor="admin-event-update-offline"
                    >
                        Оффлайн
                    </Form.Check.Label>
                </Form.Check>
            </Container>
        </Container>
    )
}
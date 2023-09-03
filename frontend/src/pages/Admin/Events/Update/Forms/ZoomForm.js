import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"


export default function ZoomForm({onChange}){
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Створити міт у Зумі?
            </FormTitle>

            <Container className="px-3">
            <Form.Check>
                    <Form.Check.Input
                        value={true}
                        onClick={onChange}
                        type="radio"
                        name="admin-event-update-zoom"
                        id="admin-event-update-zoom-true"
                    />
                    <Form.Check.Label
                        htmlFor="admin-event-update-zoom-true"
                    >
                        Так
                    </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input
                        value={false}
                        onClick={onChange}
                        type="radio" 
                        name="admin-event-update-zoom"
                        id="admin-event-update-zoom-false"
                    />
                    <Form.Check.Label
                        htmlFor="admin-event-update-zoom-false"
                    >
                        Ні
                    </Form.Check.Label>
                </Form.Check>
            </Container>
        </Container>
    )
}
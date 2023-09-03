import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"


export default function DurationForm({duration, onChange}){
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть тривалість зустрічі
            </FormTitle>

            <Container className="px-3">
                <Form.Control
                    value={duration}
                    onChange={onChange}
                />
            </Container>
        </Container>
    )
}
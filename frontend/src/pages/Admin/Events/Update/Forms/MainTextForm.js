import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"


export default function MainTextForm({text, onChange}){
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть Головний текст
            </FormTitle>

            <Container className="px-3">
                <Form.Control
                    className="text-break"
                    value={text}
                    onChange={onChange}
                    as="textarea" rows={5}
                />
            </Container>
        </Container>
    )
}
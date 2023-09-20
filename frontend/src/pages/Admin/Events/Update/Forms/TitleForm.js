import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"


export default function TitleForm({title, onChange}){
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть назву зустрічі
            </FormTitle>

            <Container className="px-3">
                <Form.Control
                    value={title ? title : ""}
                    onChange={onChange}
                />
            </Container>
        </Container>
    )
}
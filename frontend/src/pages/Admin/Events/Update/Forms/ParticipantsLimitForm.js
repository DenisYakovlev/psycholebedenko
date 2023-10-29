import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"


export default function ParticipantsLimitForm({limit, onChange}){
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть максимальну кількість участників
            </FormTitle>

            <Container className="px-3">
                <Form.Control
                    value={limit ? limit : ''}
                    onChange={onChange}
                    type="number"
                />
            </Container>
        </Container>
    )
}
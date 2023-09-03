import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"


export default function AddressForm({address, onChange}){
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть адресу зустрічі(якщо треба)
            </FormTitle>

            <Container className="px-3">
                <Form.Control
                    value={address ? address : ""}
                    onChange={onChange}
                    type="text"
                />
            </Container>
        </Container>
    )
}
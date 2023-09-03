import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"


export default function AddressForm({address, setAddress}){
    return (
        <Container>
            <Form.Control value={address} onChange={e => setAddress(e.target.value)}/>
        </Container>
    )
}
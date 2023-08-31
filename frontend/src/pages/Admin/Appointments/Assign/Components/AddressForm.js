import Form from "react-bootstrap/Form"


export default function AddressForm({address, setAddress}){
    return (
        <Form>
            <Form.Control value={address} onChange={e => setAddress(e.target.value)}/>
        </Form>
    )
}
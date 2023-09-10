import Form from "react-bootstrap/Form"


export default function AddressForm({address, onChange}){
    return (
        <Form.Control
            value={address ? address : ""}
            onChange={onChange}
            type="text"
        />
    )
}

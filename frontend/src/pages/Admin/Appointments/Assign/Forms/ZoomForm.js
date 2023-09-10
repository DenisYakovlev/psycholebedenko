import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"


export default function ZoomForm({value, onChange}){
    const handleChange = e => {
        console.log(e.target.value)
        onChange(e)
    }

    return (
        <Container className="p-0" fluid>
            <Form.Check>
                <Form.Check.Input
                    value={true}
                    onClick={handleChange}
                    defaultChecked={value}
                    type="radio"
                    name="admin-appointment-create-zoom"
                    id="admin-appointment-create-zoom-true"
                />
                <Form.Check.Label
                    htmlFor="admin-appointment-create-zoom-true"
                >
                    Так
                </Form.Check.Label>
            </Form.Check>
            <Form.Check>
                <Form.Check.Input
                    value={false}
                    onClick={handleChange}
                    defaultChecked={!value}
                    type="radio" 
                    name="admin-appointment-create-zoom"
                    id="admin-appointment-create-zoom-false"
                />
                <Form.Check.Label
                    htmlFor="admin-appointment-create-zoom-false"
                >
                    Ні
                </Form.Check.Label>
            </Form.Check>
        </Container>
    )
}
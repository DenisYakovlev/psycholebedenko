import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { AppointmentForm } from "../../shared"

export default function Appointment(){
    return (
        <Container className="p-0 vh-100" fluid>
            <Row className="p-0 h-100">
                <Col className="p-0 d-flex justify-content-center align-items-center">
                    <AppointmentForm />
                </Col>
            </Row>
        </Container>
    )
}
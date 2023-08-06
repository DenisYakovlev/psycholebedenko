import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { AppointmentForm } from "../../shared"

export default function Appointment(){
    return (
        <Container style={{backgroundColor: "#f4f4f4", minHeight: "100vh", height: "fit-content", minWidth: "380px"}} className="p-0" fluid>
            <Row className="p-0 m-0">
                <Col className="p-0 m-0 vh-100 mt-5 d-flex justify-content-center align-items-start">
                    <AppointmentForm />
                </Col>
            </Row>
        </Container>
    )
}
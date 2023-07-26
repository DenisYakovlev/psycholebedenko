import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Events(){
    return (
        <Container id="events" className="p-0 vh-100 d-flex justify-content-center align-items-center">
            <Row>
                <Col className="fs-1">
                    Events
                </Col>
            </Row>
        </Container>
    )
}
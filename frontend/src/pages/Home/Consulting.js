import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Consulting(){
    return (
        <Container id="consulting" style={{height: "100vh"}} className="p-0 d-flex justify-content-center align-items-center">
            <Row>
                <Col className="fs-1">
                    Consulting
                </Col>
            </Row>
        </Container>
    )
}
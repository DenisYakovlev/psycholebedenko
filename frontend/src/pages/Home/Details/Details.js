import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Details(){
    return (
        <Container style={{backgroundColor: "#f4f4f4"}} className="m-0 p-0" fluid>
            <Row lg={4} sm={2} xs={1} style={{height: "fit-content", maxWidth: "1200px"}} className="m-0 py-5 mx-lg-auto">
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 className="text-dark">Header #1</h2>
                    <p style={{whiteSpace: "initial"}} className="text-muted">Main Text#1</p>
                </Col>
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 className="text-dark">Header #2</h2>
                    <p className="text-muted">Main Text#2</p>
                </Col>
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 className="text-dark">Header #3</h2>
                    <p className="text-muted">Main Text#3</p>
                </Col> 
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 className="text-dark">Header #4</h2>
                    <p className="text-muted">Main Text#4</p>
                </Col>
            </Row>
        </Container>
    )
}
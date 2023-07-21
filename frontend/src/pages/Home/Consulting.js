import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import bgImage from "./../../assets/images/bg-home-1.jpg"

export default function Consulting(){
    return (
        <Container 
            id="consulting" 
            fluid
            style={{height: "fit-content"}}
            className="p-0 d-flex justify-content-center align-items-center">
            <Row>
                <Col className="fs-1">
                    <Image src={bgImage} fluid />
                </Col>
            </Row>
        </Container>
    )
}
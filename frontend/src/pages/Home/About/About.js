import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

import HeaderText from "./HeaderText"
import bg from "./../../../assets/images/zoom-icon.png"

export default function About(){
    return (
        <Container id="about" style={{minHeight: "100vh", backgroundColor: "#f4f4f4"}} className="m-0 p-0" fluid>
            <HeaderText />
            <Container fluid className="p-0">
                <Row md={2} sm={1} xs={1} style={{height: "fit-content", maxWidth: "1200px"}} className="p-0 m-0 my-5 mx-md-auto">
                    <Col style={{height: "50vh"}} className="m-0 p-0 d-flex flex-column justify-content-center align-items-center gap-3">
                        <h1 className="text-dark text-center text-justify">Main Text</h1>
                        <p className="text-muted text-center text-justify">Side Tetxt</p>
                    </Col>
                    <Col style={{height: "50vh"}} className="m-0 p-0 d-flex justify-content-center align-items-center">
                        <Image src={bg} width="250px" height="250px"/>
                    </Col>
                </Row>
                <Row md={2} sm={1} xs={1} style={{height: "fit-content", maxWidth: "1200px"}} className="p-0 m-0 my-5 mx-md-auto flex-row-reverse">
                    <Col style={{height: "50vh"}} className="m-0 p-0 d-flex flex-column justify-content-center align-items-center gap-3">
                        <h1 className="text-dark text-center text-justify">Main Text</h1>
                        <p className="text-muted text-center text-justify">Side Tetxt</p>
                    </Col>
                    <Col style={{height: "50vh"}} className="m-0 p-0 d-flex justify-content-center align-items-center">
                        <Image src={bg} width="250px" height="250px"/>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
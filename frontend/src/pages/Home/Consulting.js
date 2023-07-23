import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import bgImage from "./../../assets/images/bg-new.png"

const styles={
    wrapper: {
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(255, 255 ,255 , 0), rgba(0, 0, 0, 1)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    text: {
        textShadow: "0px -2px 50px black"
    }
}

export default function Consulting(){
    return (
        <Container style={styles.wrapper} className="p-0 position-relative" fluid>
            <Row sm={12} className="p-0 m-0 h-100">
                <Col style={{marginTop: "-15vh"}} className="p-0 d-flex flex-column text-light justify-content-center align-items-center ">
                    <p style={{...styles.text ,fontSize: "10vw"}} className="m-0">Lead text #1</p>
                    <p style={{...styles.text, fontSize: "5vw"}} className="m-0 mb-3">Side text #1</p>
                    <Button style={{fontSize: "3vw"}} variant="outline-light p-xl-3" size="lg">
                        Записатись
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTelegram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faUserSecret} from "@fortawesome/free-solid-svg-icons"

// refactor
export default function Credentials(){
    return (
        <Container className="m-0 mb-3 p-0 d-flex flex-column align-items-center justify-content-center main-credentials">
            <Row className="m-0 p-0 g-5">
                <Col className="m-0 d-flex flex-column justify-content-center align-items-center gap-2 main-icon">
                    <FontAwesomeIcon icon={faTelegram} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>ТЕЛЕГРАМ</p>
                </Col>
                <Col className="m-0 d-flex flex-column justify-content-center align-items-center gap-2 main-icon">
                    <FontAwesomeIcon icon={faInstagram} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>ІНСТАГРАМ</p>
                </Col>
                <Col className="m-0 d-flex flex-column justify-content-center align-items-center gap-2 main-icon">
                    <FontAwesomeIcon icon={faLinkedin} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>ЛІНКЕДІН</p>
                </Col>
                <Col className="m-0 d-flex flex-column justify-content-center align-items-center gap-2 main-icon">
                    <FontAwesomeIcon icon={faTelegram} style={{fontSize: "32px"}}/>
                    <p className="text-center" style={{fontSize: "8px"}}>БОТ</p>
                </Col>
            </Row>
        </Container>
    )
}
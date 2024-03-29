import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faTelegram, faLinkedin } from "@fortawesome/free-brands-svg-icons"


const SocialLinkCol = ({link, children, ...props}) => {
    const transitionDelay = 250

    // wait for click animation to complete and open link in new tab
    // click animation duration is 0.2 sec
    const handleClick = e => {
        setTimeout(() => {
            window.open(link, "_blank")
        }, transitionDelay)
    }

    return (
        <Col 
            onClick={e => handleClick(e)}
            {...props}
            style={{cursor: "pointer"}}
            className={
                `m-0 d-flex flex-column justify-content-center align-items-center \
                gap-2 main-icon ${props.className ? props.className : ""}`
            }
        >
            {children}
        </Col>
    )
}


export default function Credentials(){
    return (
        <Container className="m-0 mb-1 p-0 d-flex flex-column align-items-center justify-content-center main-credentials">
            <Row className="m-0 p-0 g-5">
                <SocialLinkCol link="https://t.me/Psycholebedenko">
                    <FontAwesomeIcon icon={faTelegram} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>
                        ТЕЛЕГРАМ
                    </p>
                </SocialLinkCol>
                <SocialLinkCol link="https://www.instagram.com/psycholebedenko_/">
                    <FontAwesomeIcon icon={faInstagram} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>
                        ІНСТАГРАМ
                    </p>
                </SocialLinkCol>
                <SocialLinkCol link="https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B4%D1%80%D0%B5%D0%B9-%D0%BB%D0%B5%D0%B1%D0%B5%D0%B4%D0%B5%D0%BD%D0%BA%D0%BE-653a4826a/">
                    <FontAwesomeIcon icon={faLinkedin} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>
                        ЛІНКЕДІН
                    </p>
                </SocialLinkCol>
                <SocialLinkCol link="https://t.me/Psycholebedenko_bot">
                    <FontAwesomeIcon icon={faTelegram} style={{fontSize: "32px"}}/>
                    <p className="text-center" style={{fontSize: "8px"}}>
                        БОТ
                    </p>
                </SocialLinkCol>
            </Row>
        </Container>
    )
}
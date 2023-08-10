import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                <SocialLinkCol link="https://www.youtube.com/watch?v=s6HWtY_ajfs&t=2938s">
                    <FontAwesomeIcon icon={faTelegram} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>
                        ТЕЛЕГРАМ
                    </p>
                </SocialLinkCol>
                <SocialLinkCol link="https://www.youtube.com/watch?v=s6HWtY_ajfs&t=2938s">
                    <FontAwesomeIcon icon={faInstagram} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>
                        ІНСТАГРАМ
                    </p>
                </SocialLinkCol>
                <SocialLinkCol link="https://www.youtube.com/watch?v=s6HWtY_ajfs&t=2938s">
                    <FontAwesomeIcon icon={faLinkedin} style={{fontSize: "32px"}}/>
                    <p style={{fontSize: "8px"}}>
                        ЛІНКЕДІН
                    </p>
                </SocialLinkCol>
                <SocialLinkCol link="https://www.youtube.com/watch?v=s6HWtY_ajfs&t=2938s">
                    <FontAwesomeIcon icon={faTelegram} style={{fontSize: "32px"}}/>
                    <p className="text-center" style={{fontSize: "8px"}}>
                        БОТ
                    </p>
                </SocialLinkCol>
            </Row>
        </Container>
    )
}
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import CardBody from './CardBody';
import "./styles.css"


const bsBorderRadius = "var(--bs-card-inner-border-radius)"

// need to refactor
export default function EventCard({event, idx, link="#"}){
    // styles for card images depending on it's position(left or right)
    const styles = {
        cardImg: {
            backgroundImage: `url(${event.img_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottomLeftRadius: idx % 2 ? bsBorderRadius: "0px",
            borderTopLeftRadius: idx % 2 ? bsBorderRadius: "0px",
            borderBottomRightRadius: idx % 2 ? "0px": bsBorderRadius,
            borderTopRightRadius: idx % 2 ? "0px": bsBorderRadius,
        }
    }

    // switch image position between left and right on large screens
    const cardDirection = idx % 2

    return (
        <Card style={{minWidth: "320px"}} 
            className={"event-card bg-gradient shadow my-4 d-flex" + " event-card"} 
            bg="light" data-bs-theme="white"
        >
            <Card.Body className={`${cardDirection ? "event-card-layout-reverse" : "event-card-layout-normal"}` + ' p-0'}>
                <Container className="event-card-body p-0 m-0 d-flex flex-column justify-content-between">
                    <CardBody event={event} link={link}/>
                    <Container className="event-card-footer fs-6 text-muted text-truncate p-0 m-0 px-md-5 px-4 pb-4 d-flex justify-content-between align-items-center">
                        <Card.Text className="m-0">
                            <FontAwesomeIcon icon={faClock} /> {event?.duration ? event.duration + " хв." : "Тривалість не вказана"}
                        </Card.Text>

                        <Button as={Link} to={link} variant="outline-dark" className="">
                            Перейти
                        </Button>
                    </Container>
                </Container>
                <Card.Img as={Container} style={styles.cardImg} className="event-card-img p-0 m-0"/>
            </Card.Body>
        </Card> 
    )
}
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from "@fortawesome/free-solid-svg-icons"
import CardBody from './CardBody';
import "./styles.css"


const bsBorderRadius = "var(--bs-card-inner-border-radius)"

// need to refactor
export default function AdaptiveEventCard({event, idx}){
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
    const cardDirection = idx % 2 ? "flex-md-row-reverse": "flex-md-row"

    return (
        <Card style={{minWidth: "320px"}} 
            className={"adaptive-event-card bg-gradient shadow my-4 d-flex " + cardDirection + " flex-column-reverse event-card"} 
            bg="light" data-bs-theme="white"
        >
            <Container className="adaptive-event-card-body p-0 m-0 d-flex flex-column justify-content-between">
                <CardBody event={event}/>
                <Container className="adaptive-event-card-footer p-0 m-0 px-md-5 px-4 pb-4 d-flex justify-content-between align-items-center">
                    <Card.Text className="m-0 fs-6 text-muted text-truncate">
                        <FontAwesomeIcon icon={faClock} /> {event?.duration + " хв."}
                    </Card.Text>
                    <Button as={Link} to={`/event/${event.id}`} variant="outline-dark" className="">
                        Перейти
                    </Button>
                </Container>
            </Container>
            <Card.Img as={Container} style={styles.cardImg} className="adaptive-event-card-img p-0 m-0"/>
        </Card> 
    )
}
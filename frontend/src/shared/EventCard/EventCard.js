import { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { AuthModalContext, UserContext } from '../../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from "@fortawesome/free-solid-svg-icons"
import CardBody from './CardBody';
import { backend_url } from "../../constants"
import "./styles.css"


const bsBorderRadius = "var(--bs-card-inner-border-radius)"

// need to refactor
export default function EventCard({event, idx}){
    const {user, authFetch} = useContext(UserContext)
    const {showAuthModal} = useContext(AuthModalContext)
    const [participated, setParticipated] = useState(event.participated)

    // update participation state on event loading(needs to be updated when user logs in)
    useEffect(() => {
        setParticipated(event.participated)
    }, [event])


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

    const handleAddParticipation = () => {
        authFetch(`${backend_url}/event/${event.title}/participate`, {
            method: "POST"
        })
        .then(response => {
            if(response.status == 200){
                setParticipated(true)
            }
        })
    }

    const handleRemoveParticipation = () => {
        authFetch(`${backend_url}/event/${event.title}/participate`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.status == 200){
                setParticipated(false)
            }
        })
    }

    // switch image position between left and right on large screens
    const cardDirection = idx % 2 ? "flex-md-row-reverse": "flex-md-row"

    return (
        <Card style={{minWidth: "320px"}} 
            className={"event-card bg-gradient shadow my-4 d-flex " + cardDirection + " flex-column-reverse"} 
            bg="light" data-bs-theme="white"
        >
            <Container className="event-card-body p-0 m-0 d-flex flex-column justify-content-between">
                <CardBody event={event}/>
                <Container className="event-card-footer p-0 m-0 px-md-5 px-4 pb-4 d-flex justify-content-between align-items-center">
                    <Card.Text className="m-0 fs-6 text-muted text-truncate">
                        <FontAwesomeIcon icon={faClock} /> {event?.duration + " хв."}
                    </Card.Text>
                    {
                        participated ?
                        <Button onClick={user ? handleRemoveParticipation : showAuthModal} variant="outline-dark" className="">
                            Відписатися
                        </Button>
                        :
                        <Button onClick={user ? handleAddParticipation : showAuthModal} variant="outline-dark" className="">
                            Записатися
                        </Button>
                    }
                </Container>
            </Container>
            <Card.Img as={Container} style={styles.cardImg} className="event-card-img p-0 m-0"/>
        </Card> 
    )
}
import { useContext, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import Container from "react-bootstrap/Container"

import onlineIcon from "./../assets/images/online-icon.png"
import offlineIcon from "./../assets/images/offline-icon.png"
import zoomIcon from "./../assets/images/zoom-icon.png"
import officeIcon from "./../assets/images/office-icon.png"
import calendarIcon from "./../assets/images/calendar.svg"
import notParticipatedIcon from "./../assets/images/event-participation-false.svg"
import participatedIcon from "./../assets/images/event-participation-true.svg"
import { UserContext } from '../contexts';


const styles = {
    card: {
        height: "50vw",
        width: "50vw", 
        minWidth: "350px", 
        minHeight: "300px",
        maxHeight: "400px", 
        maxWidth: "500px", 
        // borderRadius: "15px"
    }
}

// need to refactor
export default function EventCard({event}){
    const {authFetch} = useContext(UserContext)
    
    const [participated, setParticipated] = useState(event.participated)
    const [show, setShow] = useState(false)
    const calendar = useRef(null)

    const truncDate = dateTime => {
        const [datePart, timePart] = dateTime.split("T");
        const [date, timezone] = datePart.split("+");

        return `${date.replace(/-/g, ".")} ${timePart.slice(0, 5)}`
    }

    const handleParticipation = () => {

    }

    return (
        <Card bg="white" data-bs-theme="light" style={styles.card} className='m-0'>
            <Card.Header className='bg-white fs-5 d-flex flex-row justify-content-between align-items-center'>
                <Card.Text title="Назва" className="m-0 align-self-center text-truncate">
                    {event.title}
                </Card.Text>
                <Container style={{width: "fit-content"}} className='m-0 p-0 d-flex flex-row gap-2 justify-content-end align-items-center'>
                    <Image 
                        src={event.online ? onlineIcon : offlineIcon} 
                        width="20px" height="20px"
                    />
                    <Image 
                        src={event.online ? zoomIcon : officeIcon} 
                        width="20px" height="20px"
                    />
                    <Image ref={calendar} src={calendarIcon} width="20px" height="20px" onClick={() => setShow(!show)}/>
                    <Overlay target={calendar.current} show={show} placement="bottom">
                        <Tooltip>
                            {truncDate(event.date)}
                        </Tooltip>
                    </Overlay>
                    <Image onClick={() => setParticipated(!participated)} src={participated ? participatedIcon: notParticipatedIcon} width="20px" height="22px"/>
                </Container>
            </Card.Header>
            <Card.Body style={{overflow: "hidden"}}>
                <Card.Text>
                    {event.thumbnail_text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="m-0 py-0 d-flex flex-row align-items-center justify-content-end" style={{height: "47px"}}>
            </Card.Footer>
        </Card>
    )
}
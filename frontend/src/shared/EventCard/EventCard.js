import { useContext, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { UserContext } from '../../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faSignal } from "@fortawesome/free-solid-svg-icons"

import "./styles.css"


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

    // return (
    //     <Card bg="white" data-bs-theme="light" style={styles.card} className='m-0'>
    //         <Card.Header className='bg-white fs-5 d-flex flex-row justify-content-between align-items-center'>
    //             <Card.Text title="Назва" className="m-0 align-self-center text-truncate">
    //                 {event.title}
    //             </Card.Text>
    //             <Container style={{width: "fit-content"}} className='m-0 p-0 d-flex flex-row gap-2 justify-content-end align-items-center'>
    //                 <Image 
    //                     src={event.online ? onlineIcon : offlineIcon} 
    //                     width="20px" height="20px"
    //                 />
    //                 <Image 
    //                     src={event.online ? zoomIcon : officeIcon} 
    //                     width="20px" height="20px"
    //                 />
    //                 <Image ref={calendar} src={calendarIcon} width="20px" height="20px" onClick={() => setShow(!show)}/>
    //                 <Overlay target={calendar.current} show={show} placement="bottom">
    //                     <Tooltip>
    //                         {truncDate(event.date)}
    //                     </Tooltip>
    //                 </Overlay>
    //                 <Image onClick={() => setParticipated(!participated)} src={participated ? participatedIcon: notParticipatedIcon} width="20px" height="22px"/>
    //             </Container>
    //         </Card.Header>
    //         <Card.Body style={{overflow: "hidden"}}>
    //             <Card.Text>
    //                 {event.thumbnail_text}
    //             </Card.Text>
    //         </Card.Body>
    //         <Card.Footer className="m-0 py-0 d-flex flex-row align-items-center justify-content-end" style={{height: "47px"}}>
    //         </Card.Footer>
    //     </Card>
    // )

    const imgUrl = "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C214%2C3008%2C1579&wid=1200&hei=630&scl=2.506666666666667"

    return (
        <Card bg="white" data-bs-theme="light" className="m-0 p-0 event-card d-flex flex-column justify-content-between">
            <Container className="p-sm-5 p-4 m-0 overflow-auto" fluid>
                <Card.Body className="p-0 m-0 event-body">
                    <Card.Text className="m-0 mb-2 text-dark fs-3 text-truncate">
                        {event.title}
                    </Card.Text>
                    <Card.Text className="m-0 mb-2">
                        <FontAwesomeIcon className='pe-2' icon={ faCalendarDays } style={{fontSize: "16px"}}/>
                        {event.date}
                    </Card.Text>
                    <hr className="m-0 mb-3 event-line" />
                    <Card.Text className="m-0 text-muted text-justify">
                            {event.thumbnail_text}
                    </Card.Text>
                </Card.Body>
            </Container>
            <Row md={4} sm={2} xs={1} className="px-sm-5 px-4 m-0 py-4 d-flex flex-row gap-3">
                <Col style={{width: "120px", background: "rgba(83, 83, 83, 0.4)"}} className='m-0 p-0'>
                    Hui
                </Col>
                <Col style={{width: "120px", background: "rgba(83, 83, 83, 0.4)"}} className='m-0 p-0'>
                    Hui
                </Col>
                <Col style={{width: "120px", background: "rgba(83, 83, 83, 0.4)"}} className='m-0 p-0'>
                    Hui
                </Col>
                <Col style={{width: "120px", background: "rgba(83, 83, 83, 0.4)"}} className='m-0 p-0'>
                    Hui
                </Col>
            </Row>
        </Card>
    )
}
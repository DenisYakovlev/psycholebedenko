import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import { formatDate } from "../../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"


export default function EventMain({event}){
    return(
        <Container style={{minWidth: "100%", minHeight: "30vh"}} className="m-0 px-5 d-flex flex-column align-items-start">
            <Card.Text className="m-0 mb-1 fs-6 text-muted text-justify">
                <FontAwesomeIcon icon={faCalendarDays}/> 
                {formatDate(event.date)}
            </Card.Text>
            <hr className="event-card-line m-0 mb-3 p-0"/>
            <Container className="p-0">
                <Card.Text className="m-0 fs-6 pe-5 text-muted text-justify">
                    {event.thumbnail_text}
                </Card.Text>
            </Container>
        </Container>
    )
}
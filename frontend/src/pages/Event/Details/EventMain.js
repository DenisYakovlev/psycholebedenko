import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import { formatDate } from "../../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"


export default function EventMain({event}){
    return(
        <Container style={{minWidth: "100%", minHeight: "30vh"}} className="m-0 px-md-5 px-3 mt-md-0 mt-3 d-flex flex-column align-items-start">
            <Card.Text className="m-0 mb-1 fs-6 text-muted text-justify">
                <FontAwesomeIcon icon={faCalendarDays} className="pe-2"/> 
                {formatDate(event.date)}
            </Card.Text>
            <hr className="event-card-line m-0 mb-3 p-0"/>
            <Container className="p-0 m-0 ">
                <Card.Text style={{whiteSpace: "break-spaces"}} className="m-0 fs-6 pe-md-5 pe-0 text-muted text-justify">
                    {event.main_text}
                </Card.Text>
            </Container>
        </Container>
    )
}
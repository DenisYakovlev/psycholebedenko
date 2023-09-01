import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EventSide from "../../../Event/Details/EventSide"
import { formatDate } from "../../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"


export default function EventCard({event}){
    return (
        <Card
            style={{minWidth: "320px", maxWidth: "90%", width: "90%"}}
            className="bg-gradient shadow border-0 fade-in-card"
            bg="white" data-bs-theme="light"
        >
            <p className="m-0 pt-5 pb-3 text-center fs-1 fw-bold">
                {event.title}
            </p>

            <Row className="m-0 mb-3 p-0 d-flex flex-column">
                <Col sm={12} xs={12}  className="m-0 px-md-5 px-0">
                    <EventSide event={event}/>
                </Col>
                <Col sm={12} xs={12} className="m-0 px-5 pt-3 pb-5 overflow-auto">
                    <Card.Text className="m-0 mb-1 fs-6 text-muted text-justify">
                        <FontAwesomeIcon icon={faCalendarDays} className="pe-2"/> 
                        {formatDate(event.date)}
                    </Card.Text>
                    <hr className="event-card-line m-0 mb-3 p-0"/>
                    <Card.Text style={{maxHeight: "30vh"}} className="m-0 fs-6 pe-0 text-muted overflow-auto text-justify">
                        {event.main_text}
                    </Card.Text>

                    <Container className="mt-5 p-0 d-flex justify-content-center align-items-center">
                        <Button variant="outline-dark" size="lg">
                            Редагувати
                        </Button>
                    </Container>
                </Col>
            </Row>
        </Card>
    )
}
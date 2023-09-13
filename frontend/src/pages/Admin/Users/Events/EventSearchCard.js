import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { formatDate } from "../../../utils"


export default function EventSearchCard({event, setSelectedEvent}){
    return (
        <Card
            bg="light" data-bs-theme="theme"
            className="m-0 p-3 rounded-0 border-0 border-bottom border-muted"
        >
            <Card.Body className="m-0 p-0 d-flex gap-2">
                <Card.Img src={event.img_url} style={{width: "56px", height: "56px"}} alt="event picture"/>

                <Container
                    style={{cursor: "pointer"}}
                    className="p-0 d-flex justify-content-between align-items-center"
                    onClick={(e) => setSelectedEvent(e, event)} 
                >
                    <Container className="m-0 px-2 d-flex flex-column">
                        <Card.Text 
                            className="m-0 p-0 fs-6 text-dark fw-semibold text-break"
                        >
                            {`${event.title ? event.title : "Назва не вказана"}`}
                        </Card.Text>
                        <Card.Text className="m-0 p-0 fs-6 text-muted">
                            {`${event.date ? formatDate(event.date) : "Дата не вказана"}`}
                        </Card.Text>
                    </Container>
                    <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className="fs-3"
                    />
                </Container>
            </Card.Body>
        </Card>
    )
}
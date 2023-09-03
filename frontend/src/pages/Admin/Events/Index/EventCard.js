import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EventSide from "../../../Event/Details/EventSide"
import { formatDate } from "../../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import ConfirmModal from "./ConfirmModal"


export default function EventCard({event, editable=false}){
    let navigate = useNavigate()
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const handleRedirect = () => {
        navigate(`/admin/events/update?event=${event.id}`)
    }

    return (
        <Card
            style={{minWidth: "320px", maxWidth: "90%", width: "90%"}}
            className="bg-gradient shadow border-0 fade-in-card"
            bg="white" data-bs-theme="light"
        >
            <ConfirmModal show={showConfirmModal} hide={() => setShowConfirmModal(false)} event={event}/>

            <p className="m-0 px-3 pt-5 pb-3 text-center fs-1 fw-bold">
                {event.title ? event.title : "Назва не вказана"}
            </p>

            <Card.Body className="p-0">
                <Row className="m-0 mb-3 p-0 d-flex flex-column">
                    <Col sm={12} xs={12}  className="m-0 px-md-5 px-0">
                        <EventSide event={event}/>
                    </Col>
                    <Col sm={12} xs={12} className="m-0 px-5 pt-3 pb-5 overflow-auto">
                        <Card.Text className="m-0 mb-1 fs-6 text-muted text-justify">
                            <FontAwesomeIcon icon={faCalendarDays} className="pe-2"/> 
                            {event.date ? formatDate(event.date) : "Дата не вказана"}
                        </Card.Text>
                        <hr className="event-card-line m-0 mb-3 p-0"/>

                        <Container className="p-0" fluid>
                            <Card.Text className="m-0 p-0 fs-5 text-dark fw-bold text-justify">
                                Основний текст
                            </Card.Text>
                            <Card.Text style={{height: "fit-content", whiteSpace: "break-spaces"}} className="m-0 fs-6 pe-0 text-dark text-justify">
                                {event.main_text}
                            </Card.Text>
                        </Container>

                        <Container className="mt-3 p-0" fluid>
                            <Card.Text className="m-0 p-0 fs-5 text-muted fw-bold text-justify">
                                Другорядний текст
                            </Card.Text>
                            <Card.Text style={{height: "fit-content", whiteSpace: "break-spaces"}} className="m-0 fs-6 pe-0 text-muted text-justify">
                                {event.thumbnail_text}
                            </Card.Text>
                        </Container>

                        {editable ?
                            <Container className="mt-5 p-0 d-flex justify-content-center align-items-center gap-3">
                                <Button onClick={handleRedirect} variant="outline-dark" size="lg">
                                    Редагувати
                                </Button>

                                <Button onClick={() => setShowConfirmModal(true)} variant="outline-dark" size="lg">
                                    Відмінити
                                </Button>
                            </Container>
                            :
                            <></>
                        }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
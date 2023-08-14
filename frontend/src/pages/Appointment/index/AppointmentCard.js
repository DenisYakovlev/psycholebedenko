import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Accordion from "react-bootstrap/Accordion"
import { formatOnlyDate, formatTime, timeDiff, setStatusColor } from "../utils"
import { useContext, useState } from "react"
import { backend_url } from "../../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faXmark ,faCalendarDays, faClock, faArrowUpRightFromSquare, faLocationDot, faCircleDot } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../../contexts"


export default function AppointmentCard({appointment}){
    const {authFetch} = useContext(UserContext)
    const [notes, setNotes] = useState(appointment.notes)

    const handleClick = () => {
        authFetch(`${backend_url}/appointment/${appointment.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                notes: notes
            })
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("appointment update error")
        })
        .catch(error => console.log(error))
    }

    return (
        <Card style={{height: "50vh"}} bg="white" data-bs-theme="light" className="m-0 p-0 bg-gradient border-0 shadow position-relative">
            <Card.Body className="m-0 py-5 px-4 w-100 position-absolute">

                <Container className="m-0 p-0 d-flex justify-content-between align-items-center">
                    <Card.Text className="m-0 p-0 text-muted fs-6">
                        Через {timeDiff(appointment.date)}
                    </Card.Text>
                    <FontAwesomeIcon style={{cursor: "pointer"}} icon={faXmark}/>
                </Container>

                <Card.Text className="m-0 p-0 text-break fw-bold fs-3">
                    {appointment.title}
                </Card.Text>

                <Container className="mt-3 d-flex flex-column gap-3">

                    <Card.Text className="m-0 p-0 fs-6">
                        <FontAwesomeIcon icon={faCalendarDays} style={{width: "16px"}} className="pe-2"/>
                        {formatOnlyDate(appointment.date)}
                    </Card.Text>

                    <Card.Text className="m-0 p-0 fs-6">
                        <FontAwesomeIcon icon={faClock} style={{width: "16px"}} className="pe-2"/>
                        {formatTime((appointment.date))}
                    </Card.Text>

                    {
                        appointment.online ? 
                        <Card.Text className="m-0 p-0 fs-6">
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{width: "16px"}} className="pe-2"/>
                            zoom link
                        </Card.Text>
                        :
                        <Card.Text className="m-0 p-0 fs-6">
                            <FontAwesomeIcon icon={faLocationDot} style={{width: "16px"}} className="pe-2"/>
                            {appointment.address}
                        </Card.Text>
                    }

                    <Card.Text className="m-0 p-0 fs-6">
                        <FontAwesomeIcon icon={faCircleDot} style={{width: "16px", color: setStatusColor(appointment.status)}} className="pe-2"/>
                        {appointment.status}
                    </Card.Text>

                </Container>
            </Card.Body>
            <Accordion className="mt-auto app-accardion">
                <Accordion.Item eventKey="0" className="border-0 rounded-0 position-relative">
                    <Accordion.Body className="pt-5" style={{height: "45vh"}}>
                        <p className="m-0 p-0 text-center fs-6 text-muted">
                            Ваші записи
                        </p>
                        <Form className="mt-3">
                            <Form.Group>
                            <Form.Control 
                                value={notes} onChange={e => setNotes(e.target.value)}
                                style={{height: "25vh", resize: "none"}} as="textarea" placeholder="Можна не заповнювати"
                            />
                            </Form.Group>
                        </Form>
                        <Container className="m-0 p-0 d-flex justify-content-center">
                            <Button onClick={handleClick} variant="outline-dark" className="mt-3 w-50 align-self-center" size="md">
                                Зберегти
                            </Button>
                        </Container>
                    </Accordion.Body>
                    <Accordion.Header className="border-top" style={{height: "5vh"}}>
                        Записки
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion>
        </Card>
    )
}
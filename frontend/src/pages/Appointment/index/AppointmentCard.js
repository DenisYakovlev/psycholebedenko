import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import { formatOnlyDate, formatTime } from "../utils"
import { LoadSpinner } from "../../../shared"
import { Suspense } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faClock, faArrowUpRightFromSquare, faLocationDot, faCircleDot } from "@fortawesome/free-solid-svg-icons"


export default function AppointmentCard({appointment}){
    const setStatusColor = status => {
        if(status == "pending"){
            return "#FFD700"
        }
        else if(status == "appointed"){
            return "#32CD32"
        }
        else if(status == "complete"){
            return "#4169E1"
        }
        else if(status == "denied"){
            return "#FF6347"
        }
    }

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Card style={{height: "50vh"}} bg="light" data-bs-theme="light" className="m-0 p-0 bg-gradient border-0 shadow position-relative">
                <Card.Body className="m-0 py-5 px-4 position-absolute">

                    <Card.Text className="m-0 p-0 text-muted fs-6">
                        Через три години
                    </Card.Text>

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
                <Accordion className="mt-auto">
                    <Accordion.Item eventKey="0" className="border-0 rounded-0 border-top position-relative">
                        <Accordion.Body style={{height: "45vh"}}>
                            {appointment.notes}
                        </Accordion.Body>
                        <Accordion.Header style={{height: "5vh"}}>
                            Записки
                        </Accordion.Header>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </Suspense>
    )
}
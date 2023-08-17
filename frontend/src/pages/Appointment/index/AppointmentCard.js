import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Accordion from "react-bootstrap/Accordion"
import Dropdown from 'react-bootstrap/Dropdown'
import { formatOnlyDate, formatTime, timeDiff, setStatusColor, setStatusUkrName } from "../../utils"
import { useContext, useState } from "react"
import { backend_url } from "../../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faXmark ,faCalendarDays, faClock, faArrowUpRightFromSquare, faLocationDot, faCircleDot, faEllipsis, faGear } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../../contexts"
import UpdateModal from "./UpdateModal"
import DeleteModal from "./DeleteModal"


export default function AppointmentCard({appointment, handleDelete, handleUpdate}){
    const {authFetch} = useContext(UserContext)
    const [notes, setNotes] = useState(appointment.notes)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [updateModalShow, setUpdateModalShow] = useState(false)

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

    const _handleDelete = () =>{
        setDeleteModalShow(true)
    }

    const _handleUpdate = () => {
        setUpdateModalShow(true)
    }

    const handleZoomRedirect = () => {
        if(appointment.zoom_link){
            window.open(appointment.zoom_link)
        }
    }

    return (
        <Card style={{height: "50vh"}} bg="light" data-bs-theme="light" className="m-0 p-0 bg-gradient border-0 shadow position-relative">
            <Card.Body className="m-0 pb-5 pt-4 px-4 w-100 position-absolute">

                <Container className="m-0 p-0 d-flex justify-content-between align-items-center">
                    <Card.Text className="m-0 p-0 text-muted fs-6">
                        {appointment.outdated ? 
                            "Вже пройшло"
                            :
                            `Через ${timeDiff(appointment.date)}`
                        }
                    </Card.Text>
                    <Dropdown>
                        <Dropdown.Toggle  as={FontAwesomeIcon} style={{cursor: "pointer"}} icon={faEllipsis} />
                        <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={_handleUpdate} disabled={appointment.outdated}>
                                <FontAwesomeIcon style={{width: "16px", cursor: "pointer"}} className="pe-1" icon={faGear}/>
                                Редагувати дату
                            </Dropdown.Item>
                            <Dropdown.Item onClick={_handleDelete} disabled={appointment.outdated}>
                                <FontAwesomeIcon style={{width: "16px", cursor: "pointer"}} className="pe-1" icon={faXmark}/>
                                Відмінити
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
                        <Card.Text onClick={handleZoomRedirect} style={{cursor: "pointer"}} className="m-0 p-0 fs-6">
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{width: "16px"}} className="pe-2"/>
                            Посилання на зум 
                        </Card.Text>
                        :
                        <Card.Text className="m-0 p-0 fs-6">
                            <FontAwesomeIcon icon={faLocationDot} style={{width: "16px"}} className="pe-2"/>
                            {appointment.address}
                        </Card.Text>
                    }

                    <Card.Text className="m-0 p-0 fs-6">
                        <FontAwesomeIcon icon={faCircleDot} style={{width: "16px", color: setStatusColor(appointment.status)}} className="pe-2"/>
                        {setStatusUkrName(appointment.status)}
                    </Card.Text>

                </Container>
            </Card.Body>

            <Container className="mt-auto p-0">
                <Accordion className="app-accardion">
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
                <DeleteModal 
                    show={deleteModalShow} hide={() => setDeleteModalShow(false)}
                    appointment={appointment} handleDelete={handleDelete}
                />
                <UpdateModal 
                    show={updateModalShow} hide={() => setUpdateModalShow(false)} 
                    appointment={appointment} handleUpdate={handleUpdate}
                />
            </Container>
        </Card>
    )
}
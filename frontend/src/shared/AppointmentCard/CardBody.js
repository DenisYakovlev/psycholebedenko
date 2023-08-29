import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faClock, faLocationDot, faCircleDot, faArrowUpRightFromSquare, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { faTelegram } from "@fortawesome/free-brands-svg-icons"
import { formatOnlyDate, formatTime, setStatusColor, setStatusUkrName } from "../../pages/utils"


export default function CardBody({appointment}){
    const handleZoomRedirect = () => {
        if(appointment.zoom_link){
            window.open(appointment.zoom_link)
        }
    }

    const handleTelegramRedirect = () => {
        if(appointment.user.phone_number){
            const url = `https://t.me/${appointment.user.phone_number}`
            window.open(url, "_blank")
        }
    }

    return (
        <>
            <Card.Text className="m-0 p-0 text-break fw-bold fs-3">
                {appointment.title}
            </Card.Text>

            <Container className="mt-3 d-flex flex-column gap-3">

                <Card.Text className="m-0 p-0 fs-6 text-dark">
                    <FontAwesomeIcon icon={faCalendarDays} style={{width: "16px"}} className="pe-2"/>
                    {appointment.date?.date ? formatOnlyDate(appointment.date.date): "Відмінено"}
                </Card.Text>

                <Card.Text className="m-0 p-0 fs-6 text-dark">
                    <FontAwesomeIcon icon={faClock} style={{width: "16px"}} className="pe-2"/>
                    {appointment.date?.date ? formatTime(appointment.date.date): "Відмінено"}
                </Card.Text>

                {
                    appointment.online ? 
                    <Card.Text onClick={handleZoomRedirect} style={{cursor: "pointer"}} className="m-0 p-0 fs-6 text-dark">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{width: "16px"}} className="pe-2"/>
                        Посилання на зум 
                    </Card.Text>
                    :
                    <Card.Text className="m-0 p-0 fs-6 text-dark">
                        <FontAwesomeIcon icon={faLocationDot} style={{width: "16px"}} className="pe-2 "/>
                        {appointment.address}
                    </Card.Text>
                }

                <Card.Text className="m-0 p-0 fs-6 text-dark">
                    <FontAwesomeIcon icon={faCircleDot} style={{width: "16px", color: setStatusColor(appointment.status)}} className="pe-2"/>
                    {setStatusUkrName(appointment.status)}
                </Card.Text>

                {appointment.user?.phone_number ? 
                    <Card.Text onClick={handleTelegramRedirect} className="m-0 p-0 fs-6 text-dark" style={{cursor: "pointer"}}>
                        <FontAwesomeIcon icon={faPhone} style={{width: "16px"}} className="pe-2"/>
                        {appointment.user.phone_number}
                    </Card.Text>
                    :
                    <></>
                }

                {appointment.user?.first_name ?
                    <Card.Text 
                        as={Link} to={`/admin/users?user=${appointment.user.id}`} 
                        className="m-0 p-0 fs-6 text-dark text-decoration-none"
                        style={{cursor: "pointer"}}
                    >
                        <FontAwesomeIcon icon={faUser} style={{width: "16px"}} className="pe-2"/>
                        {appointment.user.first_name}
                    </Card.Text>
                    :
                    <></>
                }
            </Container>
        </>
    )
}
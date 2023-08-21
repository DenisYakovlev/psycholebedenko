import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faClock, faLocationDot, faCircleDot, faArrowUpRightFromSquare, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { formatOnlyDate, formatTime, setStatusColor, setStatusUkrName } from "../../pages/utils"



export default function CardBody({appointment}){
    const handleZoomRedirect = () => {
        if(appointment.zoom_link){
            window.open(appointment.zoom_link)
        }
    }

    return (
        <>
            <Card.Text className="m-0 p-0 text-break fw-bold fs-3">
                {appointment.title}
            </Card.Text>

            <Container className="mt-3 d-flex flex-column gap-3">

                <Card.Text className="m-0 p-0 fs-6">
                    <FontAwesomeIcon icon={faCalendarDays} style={{width: "16px"}} className="pe-2"/>
                    {formatOnlyDate(appointment.date.date)}
                </Card.Text>

                <Card.Text className="m-0 p-0 fs-6">
                    <FontAwesomeIcon icon={faClock} style={{width: "16px"}} className="pe-2"/>
                    {formatTime((appointment.date.date))}
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

                {appointment.user?.phone_number ?
                    <Card.Text className="m-0 p-0 fs-6">
                        <FontAwesomeIcon icon={faPhone} style={{width: "16px"}} className="pe-2"/>
                        {appointment.user.phone_number}
                    </Card.Text>
                    :
                    <></>
                }

                {appointment.user?.first_name ?
                    <Card.Text className="m-0 p-0 fs-6">
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
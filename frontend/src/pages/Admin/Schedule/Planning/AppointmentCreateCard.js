import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


export default function AppointmentCreateCard({date}){
    return (
        <Container className="p-0 d-flex justify-content-center align-items-center" fluid>
            <Card 
                as={Link} 
                to={`/admin/appointments/assign?date=${encodeURIComponent(JSON.stringify(date.schedule))}`}
                style={{
                    height: "500px", 
                    cursor: "pointer", 
                    minWidth: "300px", 
                    maxWidth: "320px"
                }} 
                bg="white" data-bs-theme="light" 
                className="m-0 p-0 bg-gradient border-0 shadow rounded fade-in-card"
            >
                <Card.Body className="m-0 p-0 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon style={{fontSize: "36px"}} icon={faPlus}/>
                </Card.Body>
            </Card>
        </Container>
    )
}
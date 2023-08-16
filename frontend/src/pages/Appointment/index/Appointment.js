import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { backend_url } from "../../../constants"
import { Suspense, useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import { LoadSpinner } from "../../../shared"
import CreateCard from "./CreateCard"
import AppointmentCard from "./AppointmentCard"
import '../styles.css'


export default function Appointment(){
    const {user, authFetch} = useContext(UserContext)
    const [appointments, setAppointments] = useState([])

    // fetch user appointments
    useEffect(() => {
        if(!user){
            return
        }

        authFetch(`${backend_url}/user/appointments`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("user appointment fetch error")
        })
        .then(data => setAppointments(data))
        .catch(error => console.log(error))
    }, [])

    const handleDelete = appointment => {
        authFetch(`${backend_url}/appointment/${appointment.id}`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.ok){
                let _appointments = [...appointments]
                _appointments.splice(_appointments.findIndex(a => a.id == appointment.id), 1)
                setAppointments(_appointments)
                return
            }

            throw new Error("Appointment delete error")
        })
        .catch(error => console.log(error))
    }

    //refactor
    const handleUpdate = (appointment, body) => {
        authFetch(`${backend_url}/appointment/${appointment.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "Application/json"
            }
        })
        .then(response => {
            if(response.ok){
                return
            }

            throw new Error("Appointment update error")
        })
        .catch(error => console.log(error))
    }

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Container 
                style={{minHeight: "100vh", height: "fit-content", backgroundColor: "#f4f4f4"}} 
                className="m-0 px-0 py-5 w-100 d-flex flex-column" fluid
            >
                <Container fluid style={{height: "10vh"}} className="m-0 p-0 d-flex flex-column justify-content-end align-items-center">
                    <h1 className="text-dark text-center text-justify">Консультації</h1>
                    <p className="text-muted text-center text-justify">Какой-то текст про Консультації</p>
                </Container>
                <Container style={{maxWidth: "100vw", minWidth: "350px", width: "1200px"}} className="m-0 p-0 align-self-center d-flex flex-column justify-content-center align-items-center gap-3" fluid>
                    <Row style={{maxWidth: "100vw", minWidth: "350px", width: "1200px"}} lg={4} md={3} sm={1} xs={1} className="m-0 p-0 justify-content-around align-items-center gap-3">
                        <Col lg={3} md={4} sm={6} xs={10} className="mt-3 p-0 appointment-card">
                            <CreateCard />
                        </Col>
                        {appointments.map((appointment, idx) => 
                            <Col key={idx} lg={3} md={4} sm={6} xs={10} className="mt-3 p-0 appointment-card">
                                <AppointmentCard appointment={appointment} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
                            </Col>
                        )}
                    </Row>
                </Container>
            </Container>
        </Suspense>
    )
}
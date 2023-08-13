import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { backend_url } from "../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import CreateCard from "./CreateCard"
import AppointmentCard from "./AppointmentCard"


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

    return (
        <Container style={{minHeight: "100vh", height: "fit-content", backgroundColor: "#f4f4f4"}} className="m-0 px-0 py-5 w-100 d-flex" fluid>
            <Row style={{width: "1200px"}} lg={4} md={3} sm={1} xs={1} className="mx-auto p-0 justify-content-around align-items-center gap-3">
                <Col lg={3} md={4} sm={6} xs={10} className="mt-3 p-0">
                    <CreateCard />
                </Col>
                {appointments.map((appointment, idx) => 
                    <Col key={idx} lg={3} md={4} sm={6} xs={10} className="mt-3 p-0">
                        <AppointmentCard appointment={appointment}/>
                    </Col>
                )}
            </Row>
        </Container>
    )
}
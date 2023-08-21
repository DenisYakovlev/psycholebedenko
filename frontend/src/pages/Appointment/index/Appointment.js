import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { backend_url } from "../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import { LoadSpinner } from "../../../shared"
import CreateCard from "./CreateCard"
import { AppointmentCard, BaseContainer, BaseTitle } from "../../../shared"
import '../styles.css'


export default function Appointment(){
    const {user, authFetch} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [appointments, setAppointments] = useState([])

    // fetch user appointments
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            await authFetch(`${backend_url}/user/appointments`, {
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

            setIsLoading(false)
        }

        if(!user){
            return
        }

        fetchData()
    }, [])

    const handleChange = appointemnt => {
        const _appointments = [...appointments].map(_appointemnt => {
            if(_appointemnt.id == appointemnt.id){
                return appointemnt
            }
            return _appointemnt
        })

        setAppointments(_appointments)
    }

    const handleDelete = appointemnt => {
        let _appointments = [...appointments]
        _appointments.splice(_appointments.findIndex(a => a.id == appointemnt.id), 1)
        setAppointments(_appointments)
    }

    return (
        <BaseContainer light>
            <BaseTitle>
                Консультації
            </BaseTitle>

            {isLoading ?
                <LoadSpinner />
                :
                <Container 
                    style={{maxWidth: "100vw", minWidth: "350px", width: "1200px"}} 
                    className="m-0 p-0 py-5 align-self-center d-flex flex-column justify-content-center align-items-center gap-3" fluid
                >
                    <Row 
                        style={{maxWidth: "100vw", minWidth: "350px", width: "1200px"}} 
                        lg={4} md={3} sm={1} xs={1} 
                        className="m-0 p-0 justify-content-around align-items-center gap-3"
                    >
                        <Col lg={3} md={4} sm={6} xs={10} className="mt-3 p-0 fade-in-card">
                            <CreateCard />
                        </Col>
                        {appointments.map(appointment => 
                            <Col key={appointment.id} lg={3} md={4} sm={6} xs={10} className="mt-3 p-0 fade-in-card">
                                <AppointmentCard 
                                    appointment={appointment} 
                                    onChange={_appointment => handleChange(_appointment)}
                                    onDelete={_appointemnt => handleDelete(_appointemnt)}
                                />
                            </Col>
                        )}
                    </Row>
                </Container>
            }

        </BaseContainer>
    )
}
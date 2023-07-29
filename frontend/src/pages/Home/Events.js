import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { EventCard } from "../../shared"


const backend_url = process.env.REACT_APP_BACKEND_URL

export default function Events(){
    const {publicFetch} = useContext(UserContext)
    const [events, setEvents] = useState([])

    useEffect(() => {
        publicFetch(`${backend_url}/event?status=active`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setEvents([...data])
        })
    }, [])

    return (
        <Container id="events" className="p-0 h-100 positiion-relative">
            <Row lg={4} sm={2} className="h-100 m-0 mt-5 p-0 gap-3 justify-content-center align-items-center">
                {events.map((event, idx) => {
                    return(
                        <Col key={idx} className="p-0">
                            <EventCard event={event}/>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
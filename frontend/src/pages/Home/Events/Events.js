import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { EventCard } from "../../../shared"
import MainText from "./MainText"

const backend_url = process.env.REACT_APP_BACKEND_URL

export default function Events(){
    const {publicFetch} = useContext(UserContext)
    const [events, setEvents] = useState([])

    useEffect(() => {
        publicFetch(`${backend_url}/event?status`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setEvents([...data])
        })
    }, [])


    return (
        <Container id="events" style={{minHeight: "100vh", paddingBottom: "15vh"}} className="m-0 px-0 positiion-relative" fluid>
            <MainText />
            <Row sm={1} xs={1} style={{width: "100%"}} className="m-0 p-0 px-0 py-5 gap-3">
                {events.map((event, idx) => {
                    return(
                        <Col key={idx} className="m-0 p-0 d-flex justify-content-center">
                            <EventCard event={event} idx={idx}/>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
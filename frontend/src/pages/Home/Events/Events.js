import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { EventCard, AdaptiveEventCard } from "../../../shared"
import { backend_url } from "../../../constants"
import { browserName } from 'react-device-detect'
import MainText from "./MainText"
import useApi from "../../../hooks/useApi"


export default function Events(){
    const {user} = useContext(UserContext)
    const {publicFetch} = useApi()
    const [events, setEvents] = useState([])

    const fetchEvents = () => {
        publicFetch.get(`event/?status=active`).then(data => setEvents([...data]))
    }
    // fetch events if user not authorized
    useEffect(() => {
        if(!user){
            fetchEvents()
        }
    }, [])

    // fetch events when user tokens are loaded from local storage
    // and refreshed on website load or if it's not valid
    useEffect(() => {
        if(user){
            fetchEvents()
        }
    }, [user])

    return (
        <Container 
            id="events" 
            style={{
                minHeight: "100vh", 
                height: "fit-content", 
            }} 
            className="px-0 pb-5 bg-white positiion-relative" fluid
        >
            <MainText />
            <Row sm={1} xs={1} style={{width: "100%"}} className="m-0 p-0 px-0 py-5 gap-3">
                {events.length > 0 ? (
                    events.map((event, idx) => {
                        return(
                            <Col key={idx} className="m-0 p-0 d-flex justify-content-center">
                                {browserName == "Safari" || browserName == "Mobile Safari" ? (
                                    // old version of safari is not compatible with usage of container quaries
                                    <AdaptiveEventCard event={event} idx={idx} link={`/event/${event.id}`} />
                                ) : (
                                    <EventCard event={event} idx={idx} link={`/event/${event.id}`} />
                                )}
                            </Col>
                        )
                    })
                ): (
                    <Col className="m-0 py-5 d-flex justify-content-center align-items-center fs-1 text-dark text-bold text-center">
                        Назар не має запланованих групових зустрічей...
                    </Col>
                )}
            </Row>
        </Container>
    )
}
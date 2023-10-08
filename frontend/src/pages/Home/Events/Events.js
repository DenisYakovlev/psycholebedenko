import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { EventCard, AdaptiveEventCard } from "../../../shared"
import { backend_url } from "../../../constants"
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
            <Row sm={1} xs={1} style={{width: "100%"}} className="m-0 p-0 px-0 py-3 gap-3">
                {events.map((event, idx) => {
                    return(
                        <Col key={idx} className="m-0 p-0 d-flex justify-content-center">
                            {/* use Adaptive card instead of normal one because of issues with safari
                            <EventCard event={event} idx={idx} link={`/event/${event.id}`}/> 
                            */}
                            <AdaptiveEventCard event={event} idx={idx} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
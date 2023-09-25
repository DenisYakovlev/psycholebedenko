import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Helmet } from "react-helmet"
import {LoadSpinner} from "../../../shared"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { EventCard } from "../../../shared"
import { backend_url } from "../../../constants"
import useApi from "../../../hooks/useApi"


export default function Event({source}){
    const {user} = useContext(UserContext)
    const {publicFetch} = useApi()
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchEvents = async () => {
        setIsLoading(true)

        await publicFetch.get(`event/?status=active`).then(data => setEvents([...data]))

        setIsLoading(false)
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
        <Container id="events" style={{minHeight: "100vh", paddingBottom: "15vh", backgroundColor: "#f4f4f4"}} className="m-0 py-5 px-0 positiion-relative" fluid>
            <Helmet>
                <title>Групові зустрічі</title>
            </Helmet>

            <Container fluid style={{height: "10vh"}} className="m-0 p-0 d-flex flex-column justify-content-end align-items-center">
                <h1 className="text-dark text-center text-justify">
                    Групові зустрічі
                </h1>
                {/* <p className="text-muted text-center text-justify">
                    Какой-то текст про групові зустрічі
                </p> */}
            </Container>
            {isLoading ? 
                <LoadSpinner />
                :
                <Row sm={1} xs={1} style={{width: "100%"}} className="m-0 p-0 px-0 py-5 gap-3">
                    {events.map((event, idx) => {
                        return(
                            <Col key={idx} className="m-0 p-0 d-flex justify-content-center">
                                <EventCard event={event} idx={idx} link={`/${source}/${event.id}`}/>
                            </Col>
                        )
                    })}
                </Row>
            }
        </Container>
    )
}
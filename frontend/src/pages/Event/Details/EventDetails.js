import { useParams } from "react-router"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { backend_url } from "../../../constants"
import { useContext, useEffect, useState } from "react"
import EventMain from "./EventMain"
import EventSide from "./EventSide"
import { AuthModalContext, UserContext } from "../../../contexts"

export default function EventDetails(){
    const {title} = useParams()
    const {user, authFetch, publicFetch} = useContext(UserContext)
    const {showAuthModal} = useContext(AuthModalContext)
    const [event, setEvent] = useState({})
    const [participated, setParticipated] = useState(null)


    useEffect(() => {
        setParticipated(event.participated)
    }, [event])

    useEffect(() => {
        publicFetch(`${backend_url}/event/${title}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setEvent(data)
        })
    }, [])

    const handleAddParticipation = () => {
        authFetch(`${backend_url}/event/${title}/participate`, {
            method: "POST"
        })
        .then(response => {
            if(response.status == 200){
                setParticipated(true)
            }
        })
    }

    const handleRemoveParticipation = () => {
        authFetch(`${backend_url}/event/${event.title}/participate`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.status == 200){
                setParticipated(false)
            }
        })
    }


    return (
        <Container 
            style={{height: "fit-content", minHeight: "100vh", backgroundColor:"#f4f4f4"}} 
            className="m-0 p-0 py-5 d-flex flex-column align-items-center" fluid
        >
            <Card
                className="bg-gradient shadow border-0"
                style={{width: "1200px", maxWidth: "90vw", minWidth: "320px"}}
                bg="white" data-bs-theme="light"
            >
                <p className="m-0 py-5 text-center fs-1 fw-bold">
                    {event.title}
                </p>

                <Row md={2} sm={1} xs={1} className="m-0 p-0 d-flex flex-md-row flex-column-reverse">
                    <Col md={8} sm={12} xs={12} className="m-0 py-5">
                        <EventMain event={event}/>
                        <Container className="m-0 px-5">
                        {participated ?
                            <Button onClick={user ? handleRemoveParticipation : showAuthModal} variant="outline-dark" className="">
                                Відписатися
                            </Button>
                            :
                            <Button onClick={user ? handleAddParticipation : showAuthModal} variant="outline-dark" className="">
                                Записатися
                            </Button>
                        }
                        </Container>
                    </Col>
                    <Col md={4} sm={12} xs={12} className="m-0 p-0">
                        <EventSide event={event}/>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}
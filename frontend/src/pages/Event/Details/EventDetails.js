import { useNavigate, useParams } from "react-router"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Helmet } from "react-helmet"
import { backend_url } from "../../../constants"
import {  useContext, useEffect, useState } from "react"
import EventMain from "./EventMain"
import { LoadSpinner } from "../../../shared"
import EventSide from "./EventSide"
import ResultModal from "./ResultModal"
import { AuthModalContext, UserContext } from "../../../contexts"
import "./styles.css"
import useApi from "../../../hooks/useApi"


export default function EventDetails(){
    let navigate = useNavigate()
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(UserContext)
    const {authFetch, baseAuthFetch, publicFetch} = useApi()
    const {showAuthModal} = useContext(AuthModalContext)
    const [showResult, setShowResult] = useState(false)
    const [resultType, setResultType] = useState("")
    const [event, setEvent] = useState({})
    const [participated, setParticipated] = useState(null)

    useEffect(() => {
        setParticipated(event.participated)
    }, [event])

    const fetchEvent = async () => {
        setIsLoading(true)

        await publicFetch.get(`event/${id}`).then(data => setEvent(data))

        setIsLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchEvent()
    }, [user])

    // useEffect(() => {
    //     fetchEvent()
    // }, [])

    const handleAddParticipation = () => {
        authFetch.post(`event/${id}/participate`).then(data => {
            setParticipated(true)
            setResultType("success-on")
            setShowResult(true)
        })
    }

    const handleRemoveParticipation = () => {
        baseAuthFetch.delete(`event/${id}/participate`).then(response => {
            if(response.ok){
                setParticipated(false)
                setResultType("success-off")
                setShowResult(true)

                return
            }

            throw new Error("Event participation delete fail")
        })
        .catch(error => {
            console.log(error)
            navigate('/error')
        })
    }

    const handleUnauthorizedParticipation = () => {
        if(event.zoom_link){
            window.open(event.zoom_link)
        }
    }

    if(isLoading){
        return <LoadSpinner />
    }

    return (
        <Container 
            style={{height: "fit-content", minHeight: "100vh", backgroundColor:"#f4f4f4"}} 
            className="m-0 p-0 py-md-5 py-0 pb-5 d-flex flex-column align-items-center" fluid
        >
            <Helmet>
                <title>{event.title ? event.title : "Групова зустріч"}</title>
                <meta name="description" 
                    content={event.thumbnail_text ? 
                    event.thumbnail_text 
                    : "Відвідайте безкоштовку групову зустріч та запишіться на особости консультацію"} 
                />
            </Helmet>

            <Card
                className="bg-gradient shadow border-0 event-details-card"
                // style={{width: "1200px", maxWidth: "90vw", minWidth: "350px"}}
                bg="white" data-bs-theme="light"
            >
                <p className="mt-3 pt-md-5 pt-3 pb-3 px-3 text-center fs-1 fw-bold">
                    {event.title}
                </p>

                <Row md={2} sm={1} xs={1} className="m-0 p-0 d-flex flex-md-row flex-column-reverse">
                    <Col md={9} sm={12} xs={12} className="m-0 py-md-5 py-3">
                        <EventMain event={event}/>
                        <Container className="m-0 mt-5 mb-3 px-md-5 px-3">
                        {user ?
                        <>
                        {participated ?
                            <Button onClick={user ? handleRemoveParticipation : showAuthModal} variant="outline-dark" className="">
                                Відписатися
                            </Button>
                            :
                            <Button 
                                onClick={user ? handleAddParticipation : showAuthModal} 
                                variant="outline-dark" 
                                className=""
                                disabled={event.participants_limit_exceeded}
                            >
                                Записатися
                            </Button>
                        }
                        </>
                        :
                        <>
                            <p className="mb-3 p-0 text-justify text-dark text-semibold fs-6">
                                При авторизації, ви зможете записатись на зустріч та отримати повідомлення у Телеграмі про початок заходу.
                            </p>
                            <Button onClick={handleUnauthorizedParticipation} variant="outline-dark" className="">
                                Відкрити посилання у Zoom
                            </Button>
                        </>
                        }
                        </Container>
                    </Col>
                    <Col md={3} sm={12} xs={12} className="m-0 p-0">
                        <EventSide event={event}/>
                    </Col>
                </Row>
            </Card>
            <ResultModal show={showResult} hide={() => setShowResult(false)} resultType={resultType}/>
        </Container>
    )
}
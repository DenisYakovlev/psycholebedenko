import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Carousel from "react-bootstrap/Carousel"
import { useState, useContext } from "react"
import { UserContext, AuthModalContext } from "../../../contexts"
import { backend_url } from "../../../constants"
import TypeSelection from "./TypeSelection"
import NotesForm from "./NotesForm"
import FinalForm from "./FinalForm"
import ResultModal from "./ResultModal"
import DatePicking from "./DatePicking"
import "../styles.css"


const styles = {
    card: {
        maxWidth: "100vw",
        minWidth: "350px",
        width: "500px",
        minHeight: "80vh",
        height: "fit-content",
    }
}

export default function AppointmentCreate(){
    const {user, checkPhoneVerification, authFetch} = useContext(UserContext)
    const {showAuthModal, setIndex} = useContext(AuthModalContext)
    const [resultShow, setResultShow] = useState(false)
    const [resultType, setResultType] = useState(null)

    const [carouselIndex, setCarouselIndex] = useState(0)
    const [online, setOnline] = useState(null)
    const [date, setDate] = useState(null)
    const [notes, setNotes] = useState("")

    const handleSelect = selectedIndex => setCarouselIndex(selectedIndex)

    const nextSlide = () => setCarouselIndex(carouselIndex + 1)

    const handleSubmit = async () => {
        if(!user){
            showAuthModal()
            return 
        }

        const phoneVerified = await checkPhoneVerification()

        if(!phoneVerified){
            // skip first step of telegram auth and show phone verification form
            setIndex(1)
            showAuthModal()
            return 
        }

        authFetch(`${backend_url}/appointment/create`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                notes: notes,
                date: date.id,
                online: online
            })
        })
        .then(response => {
            if(response.ok){
                setResultType("success")
                setResultShow(true)
            }
            else{
                setResultType("conflict")
                setResultShow(true)
            }
        })
        .catch(error => console.log(error))
    }

    const submitDate = date => {
        setDate(date)
        nextSlide()
    }
    
    return (
        <Container 
            style={{backgroundColor: "#f4f4f4", height: "fit-content", minHeight: "80vh"}} 
            className="p-0 m-0 d-flex justify-content-center align-items-start" fluid
        >
            <Card 
                style={styles.card} bg="light" data-bs-theme="light" 
                className= 
                    "h-100 mt-sm-5 mb-5 p-0 shadow border-0 \
                    d-flex flex-column justify-content-start fade-in-card"
            >
                <Card.Header 
                    style={{height: "10vh"}} 
                    className="p-0 fs-2 d-flex align-items-center justify-content-center fw-bold bg-light border-0"
                >
                    <p className="m-0 p-0">
                        Запис на прийом
                    </p>
                </Card.Header>
                <Card.Body className="m-0 px-sm-5 px-3 d-flex flex-column gap-3">
                    <Carousel
                        className="pb-5 appointment-carousel"
                        variant="dark" style={{minHeight: "70vh", height: "fit-content"}}
                        activeIndex={carouselIndex} onSelect={handleSelect}
                        controls={false} indicators={true} 
                        interval={null} touch={true}
                    >
                        <Carousel.Item>
                            <TypeSelection setOnline={setOnline} nextSlide={nextSlide}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <DatePicking sumbitDate={submitDate}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <NotesForm nextSlide={nextSlide} notes={notes} setNotes={setNotes}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <FinalForm 
                                online={online} date={date} notes={notes} setNotes={setNotes} 
                                handleSubmit={handleSubmit} setCarouselIndex={setCarouselIndex}
                            />
                        </Carousel.Item>
                    </Carousel>
                </Card.Body>
            </Card>
            <ResultModal show={resultShow} hide={() => setResultShow(false)} resultType={resultType}/> 
        </Container>
    )
}
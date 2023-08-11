import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Carousel from "react-bootstrap/Carousel"
import { useState, useContext, Suspense } from "react"
import { UserContext, AuthModalContext } from "../../contexts"
import { backend_url } from "../../constants"
import TypeSelection from "./TypeSelection"
import DateSelection from "./DateSelection/DateSelection"
import NotesForm from "./NotesForm"
import LoadSpinner from "./../../shared/LoadSpinner"
import "./styles.css"


const styles = {
    card: {
        maxWidth: "100vw",
        minWidth: "350px",
        width: "500px",
        minHeight: "80vh",
        height: "fit-content",
    }
}

export default function Appointment(){
    const {user, checkPhoneVerification, authFetch} = useContext(UserContext)
    const {showAuthModal, setIndex} = useContext(AuthModalContext)

    const [carouselIndex, setCarouselIndex] = useState(0)
    const [online, setOnline] = useState(false)
    const [date, setDate] = useState("")
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

        console.log({
            notes: notes,
            date: date,
            online: online
        })

        return authFetch(`${backend_url}/appointment/create`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                notes: notes,
                date: date,
                online: online
            })
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Appointment create error")
            }
        })
        .catch(error => console.log(error))
    }
    
    return (
        <Suspense fallback={<LoadSpinner />}>
            <Container 
                style={{backgroundColor: "#f4f4f4", height: "fit-content", minHeight: "80vh"}} 
                className="p-0 m-0 d-flex justify-content-center align-items-start" fluid
            >
                <Card 
                    style={styles.card} bg="light" data-bs-theme="light" 
                    className= 
                        "h-100 mt-sm-5 mb-5 p-0 shadow border-0 \
                        d-flex flex-column justify-content-start appointment-card"
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
                                <DateSelection setDate={setDate} nextSlide={nextSlide}/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <NotesForm handleSubmit={handleSubmit} notes={notes} setNotes={setNotes}/>
                            </Carousel.Item>
                        </Carousel>
                    </Card.Body>
                </Card> 
            </Container>
        </Suspense>
    )
}
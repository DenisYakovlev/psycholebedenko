import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Carousel from "react-bootstrap/Carousel"
import { useState } from "react"
import TypeSelection from "./TypeSelection"
import DateSelection from "./DateSelection/DateSelection"
import NotesForm from "./NotesForm"


const styles = {
    card: {
        maxWidth: "100vw",
        minWidth: "350px",
        width: "500px",
        minHeight: "80vh",
        height: "fit-content",
    }
}

// need to refactly(poor writen code)
export default function Appointment(){
    const [index, setIndex] = useState(0)
    const [online, setOnline] = useState(false)

    const handleSelect = selectedIndex => setIndex(selectedIndex)

    const nextSlide = () => setIndex(index + 1)
    
    return (
        <Container style={{backgroundColor: "#f4f4f4", height: "fit-content"}} className="p-0 m-0 d-flex justify-content-center align-items-start" fluid>
            <Card style={styles.card} bg="light" data-bs-theme="light" className="h-100 mt-sm-5 mb-5 p-0 shadow border-0 d-flex flex-column justify-content-start">
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
                        variant="dark" style={{height: "70vh"}}
                        activeIndex={index} onSelect={handleSelect}
                        controls={false} indicators={true} 
                        interval={null} touch={true}
                    >
                        <Carousel.Item>
                            <TypeSelection setOnline={setOnline} nextSlide={nextSlide}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <DateSelection />
                        </Carousel.Item>
                        <Carousel.Item>
                            <NotesForm />
                        </Carousel.Item>
                    </Carousel>
                </Card.Body>
            </Card> 
        </Container>
    )
}
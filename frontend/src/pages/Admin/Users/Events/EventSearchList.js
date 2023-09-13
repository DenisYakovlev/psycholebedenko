import { useRef } from "react"
import Container from "react-bootstrap/Container"
import EventSearchCard from "./EventSearchCard"


export default function EventSearchList({events, setSelectedEvent}){
    let selectedCard = useRef(null)

    const handleSelect = (e, event) => {
        if(selectedCard.current){
            selectedCard.current.style.setProperty("color", "var(--bs-dark)", "important")
        }

        selectedCard.current = e.target
        // selectedCard.current.style.setProperty("color", "var(--bs-success)", "important")
        
        setSelectedEvent(event.id)
    }

    return (
        <Container className="p-0">
            {events ?
                <Container className="p-0">
                    {Object.values(events).map(event => 
                        <EventSearchCard 
                            key={event.id} 
                            event={event} 
                            setSelectedEvent={(e, event) => handleSelect(e, event)}
                        />
                    )}
                </Container>
                :
                <></>
            }
        </Container>
    )
}
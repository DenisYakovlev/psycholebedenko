import Container from "react-bootstrap/Container"
import { BaseLayoutTitle } from "../../Components"
import EventSearchFilter from "./EventSearchFilter"


export default function LayoutSide({events, setEvents, setSelectedEvent}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Параметри
            </BaseLayoutTitle>

            <EventSearchFilter 
                events={events}
                setEvents={setEvents}
                setSelectedEvent={setSelectedEvent}
            />
        </Container>
    )
}
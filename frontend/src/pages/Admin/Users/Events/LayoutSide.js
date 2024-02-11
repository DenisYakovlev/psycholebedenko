import Container from "react-bootstrap/Container"
import EventSearchCard from "./EventSearchCard"
import {ObjSearchFilter} from "../../Components"
import { BaseLayoutTitle } from "../../Components"


export default function LayoutSide({events, setEvents, setSelectedEvent}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Параметри
            </BaseLayoutTitle>

            {/* <EventSearchFilter 
                events={events}
                setEvents={setEvents}
                setSelectedEvent={setSelectedEvent}
            /> */}
            <ObjSearchFilter
                obj={events}
                setObj={setEvents}
                ObjComponent={EventSearchCard}
                setSelectedObj={event => setSelectedEvent(event.id)}
                apiUrl="event/participants_list"
                searchPlaceholder="Введіть назву івенту"
            />
        </Container>
    )
}
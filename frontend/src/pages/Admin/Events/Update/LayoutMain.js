import Container from "react-bootstrap/Container"
import MainEventCard from "../Index/MainEventCard"
import { EventCard } from "../../../../shared"
import { BaseLayoutTitle } from "../../Components"


export default function LayoutMain({event}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Вихідна картка
            </BaseLayoutTitle>

            {event ?
                <Container className="my-5 p-0 d-flex flex-column gap-3 justify-content-center align-items-center">
                    <EventCard event={event} idx={0}/>
                    <MainEventCard event={event}/>
                </Container>
                :
                <></>
            }
        </Container>
    )
}
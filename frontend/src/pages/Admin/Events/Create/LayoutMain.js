import Container from "react-bootstrap/Container"
import EventCard from "../Index/EventCard"
import { BaseLayoutTitle } from "../../Components"


export default function LayoutMain({event}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Вихідна картка
            </BaseLayoutTitle>

            {event ?
                <Container className="my-5 p-0 d-flex justify-content-center align-items-center">
                    <EventCard event={event}/>
                </Container>
                :
                <></>
            }
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

export default function EventSide({event}){
    return (
        <Container className="m-0 pb-5 pt-3 px-3 h-100 d-flex justify-content-center">
            <Card>
                <Card.Text className="m-0 p-0">
                    <FontAwesomeIcon icon={faClock}/>
                    {event.date}
                </Card.Text>
            </Card>
        </Container>
    )
}
import Accordion from "react-bootstrap/Accordion"
import ListGroup from "react-bootstrap/ListGroup"


export default function AccordionBody({children}){
    return (
        <Accordion.Body className="p-0">
            <ListGroup variant="flush">
                {children}
            </ListGroup>
        </Accordion.Body>
    )
}
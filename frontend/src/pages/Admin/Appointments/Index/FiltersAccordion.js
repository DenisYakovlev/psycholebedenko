import Accordion from "react-bootstrap/Accordion"
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const FiltersAccordion = ({children}) => {
    return (
        <Accordion>
            {children}
        </Accordion>
    )
}

FiltersAccordion.Item = ({children, eventKey}) => {
    return (
        <Accordion.Item
            className="border-0 rounded-0"
            style={{
                backgroundColor: "var(--bs-gray-100)",
                minWidth: "100%"
            }}
            eventKey={eventKey}
        >
            {children}
        </Accordion.Item>
    )
}

FiltersAccordion.Body = ({children}) => {
    return (
        <Accordion.Body className="p-0">
            {children}
        </Accordion.Body>
    )
}

const FiltersAccordionToggle = ({children, icon, bordered=true, eventKey}) => {
    const handleClick = useAccordionButton(eventKey)
    
    return (
        <Container 
            style={{
                cursor: "pointer", 
                minWidth: "100%",
                borderBottom: "solid 1px var(--bs-gray-400)", 
                borderTop: `${bordered ? "solid 1px var(--bs-gray-400)": "none"}`
            }}
            onClick={handleClick}
            className="m-0 p-3 d-flex align-items-center"
        >
            <FontAwesomeIcon icon={icon} style={{width: "40px", height: "32px", fontSize: "32px"}}/>
                {children}
        </Container>
    )
}

FiltersAccordionToggle.Title = ({children}) => {
    return (
        <p className="m-0 px-3 text-muted fs-4">
            {children}
        </p>
    )
}


export {FiltersAccordion, FiltersAccordionToggle}
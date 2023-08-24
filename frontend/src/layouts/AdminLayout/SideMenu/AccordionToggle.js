import { useAccordionButton } from "react-bootstrap/AccordionButton"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function AccordionToggle({children, icon, bordered=true, eventKey}){
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
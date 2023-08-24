import Accordion from "react-bootstrap/Accordion"


export default function AccordionItem({children, eventKey}){
    return (
        <Accordion.Item
            className="border-0 rounded-0"
            style={{
                minWidth: "100%"
            }}
            eventKey={eventKey}
        >
            {children}
        </Accordion.Item>
    )
}
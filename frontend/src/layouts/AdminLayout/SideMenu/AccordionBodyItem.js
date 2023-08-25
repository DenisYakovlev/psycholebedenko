import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"


export default function AccordionBodyItem({children, to="#", onClick, props}){
    return (
        <ListGroup.Item 
            as={Link} to={to} 
            onClick={onClick}
            className="text-decoration-none fs-5 text-justify side-menu-item"
            {...props}
        >
            {children}
        </ListGroup.Item>
    )
}
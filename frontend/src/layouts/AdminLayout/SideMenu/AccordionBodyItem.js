import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"


export default function AccordionBodyItem({children, to="#", onClick, props}){
    return (
        <ListGroup.Item onClick={onClick} {...props}>
            <Link to={to} className="text-decoration-none fs-5 text-justify side-menu-item">
                {children}
            </Link>
        </ListGroup.Item>
    )
}
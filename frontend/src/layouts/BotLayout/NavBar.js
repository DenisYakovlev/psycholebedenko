import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUsers, faClipboardCheck, faComments } from "@fortawesome/free-solid-svg-icons"


const NavLink = ({children, to="#", props}) => {
    return (
        <Nav.Item 
            {...props}
            as={Link} to={to}
            className="d-flex flex-column align-items-center gap-1 text-decoration-none text-muted"
            style={{cursor: "pointer"}}
        >
            {children}
        </Nav.Item>
    )
}


export default function NavBar(){
    return (
        <Navbar style={{height: "56px"}} expand fixed='bottom' className='bg-white border-top border-muted'>
            <Nav justify className='m-0 p-0 w-100 d-flex justify-content-between'>
                <NavLink to="/bot/">
                    <FontAwesomeIcon icon={faHouse}/>
                    <p className="m-0 p-0 text-justify " style={{fontSize: "10px"}}>
                        Головна
                    </p>
                </NavLink>
                <NavLink to="/bot/appointment">
                    <FontAwesomeIcon icon={faComments}/>
                    <p className="m-0 p-0 text-justify " style={{fontSize: "10px"}}>
                        Консультації
                    </p>
                </NavLink>
                <NavLink to="/bot/event">
                    <FontAwesomeIcon icon={faUsers}/>
                    <p className="m-0 p-0 text-justify" style={{fontSize: "10px"}}>
                        Групові зустрічі 
                    </p>
                </NavLink>
                <NavLink to="/bot/tests">
                    <FontAwesomeIcon icon={faClipboardCheck}/>
                    <p className="m-0 p-0 text-justify" style={{fontSize: "10px"}}>
                        Тести 
                    </p>
                </NavLink>
            </Nav>
        </Navbar>
    )
}
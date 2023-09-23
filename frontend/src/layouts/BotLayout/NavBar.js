import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faClipboardCheck, faComments } from "@fortawesome/free-solid-svg-icons"


export default function NavBar(){
    return (
        <Navbar style={{height: "56px"}} expand fixed='bottom' className='bg-white border-top border-muted'>
            <Nav justify className='m-0 p-0 w-100 d-flex justify-content-between'>
                <Nav.Item className="d-flex flex-column align-items-center gap-1" style={{cursor: "pointer"}}>
                    <FontAwesomeIcon icon={faComments}/>
                    <p className="m-0 p-0 text-justify text-dark " style={{fontSize: "10px"}}>
                        Консультації
                    </p>
                </Nav.Item>
                <Nav.Item className="d-flex flex-column align-items-center gap-1" style={{cursor: "pointer"}}>
                    <FontAwesomeIcon icon={faUsers}/>
                    <p className="m-0 p-0 text-justify text-dark" style={{fontSize: "10px"}}>
                        Групові зустрічі 
                    </p>
                </Nav.Item>
                <Nav.Item className="d-flex flex-column align-items-center gap-1" style={{cursor: "pointer"}}>
                    <FontAwesomeIcon icon={faClipboardCheck}/>
                    <p className="m-0 p-0 text-justify text-dark" style={{fontSize: "10px"}}>
                        Тести 
                    </p>
                </Nav.Item>
                <Nav.Item className="d-flex flex-column align-items-center gap-1" style={{cursor: "pointer"}}>
                    <FontAwesomeIcon icon={faUser}/>
                    <p className="m-0 p-0 text-justify text-dark" style={{fontSize: "10px"}}>
                        Профіль 
                    </p>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}
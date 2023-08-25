import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


export default function CreateCard(){
    return (
        <Card 
            as={Link} to="/appointment/create"
            style={{height: "500px", cursor: "pointer", minWidth: "300px", maxWidth: "320px"}} 
            bg="light" data-bs-theme="light" 
            className="m-0 p-0 bg-gradient border-0 shadow rounded"
        >
            <Card.Body className="m-0 p-0 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon style={{fontSize: "36px"}} icon={faPlus}/>
            </Card.Body>
        </Card>
    )
}
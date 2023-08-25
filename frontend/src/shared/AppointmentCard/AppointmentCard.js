import Card from "react-bootstrap/Card"
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"
import CardFooter from "./CardFooter"


export default function AppointmentCard({appointment, onChange, onDelete}){
    return (
        <Card
            style={{height: "500px", minWidth: "300px", maxWidth: "320px"}} bg="light" data-bs-theme="light" 
            className="m-0 p-0 bg-gradient border-0 shadow position-relative"
        >
            <Card.Body className="m-0 pb-5 pt-4 px-4 w-100 position-absolute">
                <CardHeader appointment={appointment} onChange={onChange} onDelete={onDelete}/>
                <CardBody appointment={appointment}/>
            </Card.Body>
            <CardFooter appointment={appointment}/>
        </Card>
    )
}
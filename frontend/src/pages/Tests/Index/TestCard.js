import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"


export default function TestCard({test}){
    return (
        <Card 
            bg="white" 
            data-bs-theme="light" 
            className="border-0 shadow text-decoration-none fade-in-card"
            as={Link} to={test.id}
        >
            <Card.Body 
                className="d-flex flex-row align-items-center justify-content-start gap-3"
            >
                <Image 
                    style={{width: "70px", height: "70px"}}
                    src={test.img}
                    alt="test source"
                    roundedCircle
                />

                <Card.Text className="m-0 p-0 fs-4 text-muted text-break">
                    {test.name}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
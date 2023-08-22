import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import { formatDate } from "../../../utils"
import Container from "react-bootstrap/Container"


export default function DateCard({date}){
    const [status, setStatus] = useState("") 
    

    return (
        <Card
            bg="light" data-bg-theme="light"
            className="m-0 p-0 shadow border-dark"
        >
            <Card.Body
                className="m-0 px-3 d-flex flex-column gap-3"
            >
                <Card.Text className="m-0 p-0 fs-4 text-dark fw-semibold">
                    {date.time}
                </Card.Text>
                <Container className="m-0 p-0 d-flex justify-content-between">
                    <Card.Text className="m-0 p-0 fs-4 text-muted fw-semibold">
                    </Card.Text>
                </Container>
            </Card.Body>
        </Card>
    )
}
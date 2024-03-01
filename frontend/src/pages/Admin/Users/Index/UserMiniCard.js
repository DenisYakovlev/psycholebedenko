import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"


export default function UserMiniCard({value, onSelect, props}){
    const cardRef = useRef(null)

    return (
        <Card
            {...props}
            bg="light" data-bs-theme="theme"
            className="m-0 p-3 rounded-0 border-0 border-bottom border-muted w-100"
            ref={cardRef}
        >
            <Card.Body className="m-0 p-0 d-flex gap-2">
                <Card.Img src={value.photo_url} style={{width: "56px", height: "56px"}} alt="user picture"/>

                <Container
                    onClick={() => onSelect(value, cardRef.current)}
                    style={{cursor: "pointer"}}
                    className="p-0 d-flex justify-content-between align-items-center"
                >
                    <Container className="m-0 px-2 d-flex flex-column">
                        <Card.Text 
                            className="m-0 p-0 fs-5 text-dark fw-semibold"
                        >
                            {`${value.first_name ? value.first_name : ""} ${value.last_name ? value.last_name : ""}`}
                        </Card.Text>
                        <Card.Text className="m-0 p-0 fs-6 text-muted">
                            {`${value.username ? "@" + value.username : "@"}`}
                        </Card.Text>
                    </Container>
                    <FontAwesomeIcon  
                        // ref={cardRef}
                        icon={faChevronRight} 
                        className="fs-3"
                    />
                </Container>
            </Card.Body>
        </Card>
    )
}
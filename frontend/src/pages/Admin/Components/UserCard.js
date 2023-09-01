import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"


export default function UserCard({user, setSelectedUser}){
    return (
        <Card
            bg="light" data-bs-theme="theme"
            className="m-0 p-3 rounded-0 border-0 border-bottom border-muted"
        >
            <Card.Body className="m-0 p-0 d-flex gap-2">
                <Card.Img src={user.photo_url} style={{width: "56px", height: "56px"}} alt="user picture"/>

                <Container
                    style={{cursor: "pointer"}}
                    className="p-0 d-flex justify-content-between align-items-center"
                >
                    <Container className="m-0 px-2 d-flex flex-column">
                        <Card.Text 
                            id={`admin-user-card-${user.id}`}
                            onClick={(e) => setSelectedUser(e, user)} 
                            className="m-0 p-0 fs-5 text-dark fw-semibold"
                        >
                            {`${user.first_name ? user.first_name : ""} ${user.last_name ? user.last_name : ""}`}
                        </Card.Text>
                        <Card.Text className="m-0 p-0 fs-6 text-muted">
                            {`${user.username ? "@" + user.username : "@"}`}
                        </Card.Text>
                    </Container>
                    <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className="fs-3"
                    />
                </Container>
            </Card.Body>
        </Card>
    )
}
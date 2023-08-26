import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTelegram } from "@fortawesome/free-brands-svg-icons"


export default function UserFullCard({user}){
    const handleTelegramRedirect = () => {
        const url = `https://t.me/${user.phone_number}`
        window.open(url, "_blank")
    }

    return (
        <Card
            bg="light" data-bs-theme="theme"
            className="m-3 p-3 rounded border-0 shadow"
        >
            <Card.Body className="m-0 p-0 d-flex flex-column gap-3">
                <Container className="m-0 p-0 d-flex flex-column align-items-center gap-3" fluid>
                    <Card.Img src={user.photo_url ? user.photo_url : ""} style={{width: "250px", height: "250px"}} alt="user picture"/>

                    <Container className="m-0 p-0 d-flex flex-column align-items-center">
                        <Card.Text className="m-0 p-0 fs-2 text-dark fw-semibold">
                            {`${user.first_name ? user.first_name : ""} ${user.last_name ? user.last_name : ""}`}
                        </Card.Text>
                        <Card.Text className="m-0 p-0 fs-3 text-muted">
                            {`${user.username ? "@" + user.username : ""}`}
                        </Card.Text>

                        <Button 
                            onClick={handleTelegramRedirect}
                            disabled={!user.phone_number}
                            className="mt-3" 
                            variant="outline-dark" 
                            size="lg"
                        >
                            Написати <FontAwesomeIcon icon={faTelegram}/> 
                        </Button>
                    </Container>
                </Container>
            </Card.Body>
        </Card>
    )
}
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"


const CardLayout = ({children}) => {
    return (
        <Card
            style={{maxWidth: "500px", minWidth: "320px"}}
            bg="light" data-bs-theme="theme"
            className="m-3 p-3 rounded border-0 shadow"
        >
            {children}
        </Card>
    )
}

CardLayout.Body = ({children}) => {
    return (
        <Card.Body className="m-0 p-0 d-flex flex-column gap-3">
            <Container className="m-0 p-0 d-flex flex-column align-items-center gap-3" fluid>
                {children}
            </Container>
        </Card.Body>
    )
}

CardLayout.Body.Header = ({children}) => {
    return (
        <Container className="m-0 p-0 d-flex flex-column align-items-center">
            {children}
        </Container>
    )
}

CardLayout.Body.Main = ({children}) => {
    return (
        <Container className="m-0 mt-3 p-0 py-3 d-flex justify-content-center align-items-center gap-3 border-top border-secondary">
            {children}
        </Container>
    )
}

export default CardLayout
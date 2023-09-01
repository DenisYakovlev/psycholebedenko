import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"


const CardLayout = ({children}) => {
    return (
        <Card
            style={{maxWidth: "100%", width: "400px", minWidth: "350px"}}
            bg="light" data-bs-theme="theme"
            className="m-3 p-3 rounded border-0 shadow fade-in-card"
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

CardLayout.Body.Stats = ({children}) => {
    return (
        <Container className="m-0 mt-3 p-0 py-3 d-flex justify-content-center align-items-center gap-3 border-top border-secondary">
            {children}
        </Container>
    )
}

CardLayout.Body.Info = ({children}) => {
    return (
        <Container className="m-0 p-0 d-flex flex-column align-items-center">
            {children}
        </Container>
    )
}

export default CardLayout
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"


const LayoutMainWrapper = ({children}) => {
    return (
        <Container className="my-5 p-0 d-flex justify-content-center align-items-center" fluid>
            {children}
        </Container>
    )
}

LayoutMainWrapper.Card = ({children}) => {
    return (
        <Card 
            style={{
                minWidth: "350px",
                width: "450px", 
                maxWidth: "100%"
            }} 
            bg="light" 
            data-bs-theme="light" 
            className="m-0 p-0 border-0 rounded shadow"
        >
            {children}
        </Card>
    )
}

LayoutMainWrapper.Card.Header = ({children}) => {
    return (
        <Card.Header className="bg-light fs-5 text-dark text-semibold text-justify">
            {children}
        </Card.Header>
    )
}

LayoutMainWrapper.Card.HeadForm = ({children}) => {
    return (
        <Container className="m-0 px-0 pb-3 d-flex flex-column border-bottom border-secondary">
            {children}
        </Container>
    )
}

LayoutMainWrapper.Card.Form = ({children}) => {
    return (
        <Container className="m-0 px-0 py-3 d-flex flex-column border-bottom border-secondary">
            {children}
        </Container>
    )
}

LayoutMainWrapper.Card.Text = ({children}) => {
    return (
        <Card.Text className="p-0 text-dark fs-6 text-justify">
            {children}
        </Card.Text>
    )
}

LayoutMainWrapper.Card.Footer = ({children}) => {
    return (
        <Container className="m-0 p-0 py-3 d-flex flex-column justify-content-center align-items-center">
            {children}
        </Container>
    )
}

LayoutMainWrapper.Card.DangerText = ({children}) => {
    return (
        <Card.Text className="px-0 pt-2 text-danger fs-6 text-justify">
            {children}
        </Card.Text>
    )
}

export default LayoutMainWrapper
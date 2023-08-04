import Container from "react-bootstrap/Container"

export default function HeaderText(){
    return (
        <Container fluid style={{height: "20vh"}} className="m-0 p-0 d-flex flex-column justify-content-end align-items-center">
            <h1 className="text-dark text-center text-justify">Про мене</h1>
            <p className="text-muted text-center text-justify">Какой-то текст про мене</p>
        </Container>
    )
}
import Container from "react-bootstrap/Container"

export default function MainText(){
    return (
        <Container fluid style={{height: "20vh"}} className="m-0 p-0 d-flex flex-column justify-content-end align-items-center">
            <h1 className="text-dark text-center text-justify">Групові зустрічі</h1>
            <p className="text-muted text-center text-justify">Какой-то текст про ивенты</p>
        </Container>
    )
}
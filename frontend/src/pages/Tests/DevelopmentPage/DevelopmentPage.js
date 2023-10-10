import Container from "react-bootstrap/Container"


export default function DevelopmentPage(){
    return (
        <Container
            style={{
                minHeight: "100vh",
                height: "fit-content"
            }}
            className="p-0 d-flex justify-content-center align-items-center fs-1 text-dark fw-bold"
            fluid
        >
            У розробці
        </Container>
    )
}
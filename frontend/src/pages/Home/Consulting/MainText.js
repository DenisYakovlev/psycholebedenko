import Container from "react-bootstrap/Container"


export default function MainText(){
    return (
        <Container className="m-0 d-flex flex-column align-items-center">
            <p className="m-0 mb-sm-2 mb-1 align-self-center main-header">
                ТУТ І ЗАРАЗ
            </p>
            <p className="m-0 mb-3 align-self-center text-center main-text">
                ВАШ ОСОБИСТИЙ ПСИХОЛОГ
            </p>
        </Container>
    )
}
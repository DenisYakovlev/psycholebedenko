import Container from "react-bootstrap/Container"


export default function MainText(){
    return (
        <Container className="m-0 d-flex flex-column align-items-center main-wrapper">
            <p className="m-0 mb-sm-2 mb-1 align-self-center main-header">
                ТУТ І ЗАРАЗ
            </p>
            <p className="m-0 mb-3 align-self-center text-center main-text">
                ВАШ ОСОБИСТИЙ ПСИХОЛОГ
            </p>
            <p className="mb-4 main-name align-self-center text-center">ЛЛЯНИЙ АНДРІЙ</p>
        </Container>
    )
}
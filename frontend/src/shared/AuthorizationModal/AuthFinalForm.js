import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"


export default function AuthFinalForm({exit}){
    const handleClick = () =>{
        exit()
    }

    return (
        <Container style={{height: "380px"}} className="m-0 p-0 d-flex flex-column align-items-center gap-2">
            <Container className="p-0 my-4 d-flex flex-column justify-content-center align-items-center">
                    <Container style={{ fontSize: "36px"}} className="mt-5 mb-2 p-0 text-success d-flex d-row gap-3 align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        Авторизовано!
                    </Container>
                    <Container className="p-0 m-0">
                        <p className="p-0 text-muted text-center fs-5">
                            Можете закрити дане вікно
                        </p>
                    </Container>
            </Container>
            <Container className="p-0 mb-5 mt-3 d-flex justify-content-center">
                <Button variant="outline-dark" size="lg" onClick={handleClick}>
                    Продовжити
                </Button>
            </Container>
        </Container>
    )
}
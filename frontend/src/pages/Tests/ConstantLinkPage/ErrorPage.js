import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"


export default function ErrorPage(){
    return (
        <Container
            style={{
                minHeight: "100vh",
                height: "fit-content",
                backgroundColor: "#f4f4f4"
            }}
            className="py-5 d-flex flex-column justify-content-start align-items-center"
            fluid
        >
            <FontAwesomeIcon 
                icon={faCircleExclamation} 
                className="text-danger pb-2"
                style={{fontSize: "90px"}}
            />
            <p className="p-0 m-0 fs-1 fw-bold text-dark text-center">
                Виникла помилка
            </p>
            <p className="p-0 m-0 fs-3 text-muted fw-semibold text-center">
                Спробуйте пізніше
            </p>
        </Container>
    )
}
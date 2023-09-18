import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { formatUnixDate } from "../../utils"
import { useContext } from "react"
import { AuthModalContext, UserContext } from "../../../contexts"


export default function CardBody({user}){
    const {setUser} = useContext(UserContext)
    const {showAuthModal} = useContext(AuthModalContext)

    const handleExit = () => {
        localStorage.removeItem('tokens')
        setUser(null)
    }

    return (
        <Card.Body style={{height: "fit-content"}} className="mb-3 px-5 d-flex flex-column gap-3">
            <Card.Text className="m-0 p-0 text-dark fs-4">
                Контактна інформація
            </Card.Text>

            <Container className="m-0 p-0 d-flex flex-column">
                <Card.Text className="m-0 p-0 text-dark fs-6">
                    Номер телефона
                </Card.Text>
                <Card.Text className="m-0 p-0 text-muted fs-6 fw-bold">
                    {user?.phone_number ? user.phone_number : "Не вказано"}
                </Card.Text>
            </Container>

            <Container className="m-0 p-0 d-flex flex-column">
                <Card.Text className="m-0 p-0 text-dark fs-6">
                    Оповіщення
                </Card.Text>
                <Card.Text className="m-0 p-0 text-muted fs-6 fw-bold">
                    {user?.notifications_on ? "Включені" : "Відключені"}
                </Card.Text>
            </Container>

            <Container className="m-0 p-0 d-flex flex-column">
                <Card.Text className="m-0 p-0 text-dark fs-6">
                    Дата Авторизації
                </Card.Text>
                <Card.Text className="m-0 p-0 text-muted fs-6 fw-bold">
                    {user?.auth_date ? formatUnixDate(user.auth_date) : "Невідома"}
                </Card.Text>
            </Container>

            <Container 
                className="mt-4 p-0 w-75 
                d-flex flex-column align-items-center gap-2"
            >
                <Card.Text className="m-0 p-0 text-center text-dark fs-6">
                    Бажаєте оновити дані?
                </Card.Text>
                <Button onClick={showAuthModal} variant="outline-dark" className="w-75" size="lg">
                    Оновити
                </Button>
                <Card.Text onClick={handleExit} className="m-0 p-0 text-center text-muted hover-text">
                    вийти
                </Card.Text>
            </Container>
        </Card.Body>
    )
}
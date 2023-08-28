import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { backend_url } from "../../../../constants"
import { useContext, useState } from "react"
import { UserContext } from "../../../../contexts"


export default function DateCard({date, onChange, onSelect}){
    const {authFetch} = useContext(UserContext)

    const handleSelect = event => {
        event.target = document.getElementById(`admin-date-card-${date.time}`)
        onSelect(event, date)
    }

    const handleActivate = async () => {
        await authFetch(`${backend_url}/schedule/create`, {
            method: "POST",
            body: JSON.stringify([{
                date: date.date
            }]),
            headers: {
                "Content-type": "Application/json"
            }
        })
        .then(response => {
            if(response.ok){
                onChange()
                return 
            }

            throw new Error("Admin schedule create error")
        })
        .catch(error => console.log(error))
    }

    const handleDeactivate = async () => {
        await authFetch(`${backend_url}/schedule/${date.schedule.id}`, {
            method: "DELETE",
        })
        .then(response => {
            if(response.ok){
                onChange()
                return 
            }

            throw new Error("Admin schedule delete error")
        })
        .catch(error => console.log(error))
    }

    return (
        <Card
            bg="light" data-bs-theme="theme"
            className="m-0 p-3 rounded-0 border-0 border-bottom border-muted"
            id={`admin-date-card-${date.time}`}
        >
            <Card.Body className="m-0 p-0 d-flex flex-column">
                <Card.Text
                    onClick={e => handleSelect(e)}
                    style={{cursor: "pointer"}}
                    className="m-0 p-0 fs-5 text-muted fw-semibold"
                >
                    {date.time}
                </Card.Text>

                <Container className="p-0 d-flex justify-content-between align-items-center">
                    <Card.Text
                        style={{color: date.schedule ? date.schedule.appointment ? "var(--bs-danger)" : "var(--bs-primary)" : "var(--bs-muted)"}} 
                        className="m-0 p-0 fs-3"
                    >
                        {date.schedule ? date.schedule.appointment ? "Занято": "Доступно" : "Пусто"}
                    </Card.Text>
                    {date.schedule ?
                        <Button 
                            onClick={handleDeactivate}
                            variant="outline-dark align-self-center" 
                            size="sm" disabled={date.schedule?.appointment}
                        >
                            Деактивувати
                        </Button>
                        :
                        <Button 
                            onClick={handleActivate}
                            variant="outline-dark align-self-center" size="sm"
                        >
                            Активувати
                        </Button>
                    }
                </Container>
            </Card.Body>
        </Card>
    )
}
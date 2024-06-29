import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { backend_url } from "../../../../constants"
import { useContext, useState } from "react"
import { UserContext } from "../../../../contexts"
import useApi from "../../../../hooks/useApi"


export default function DateCard({date, onChange, onSelect}){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()

    // change selected date and scroll to it position
    const handleSelect = event => {
        event.target = document.getElementById(`admin-date-card-${date.time}`)
        onSelect(event, date)
    }

    // activate date and allow asignment to it
    const handleActivate = async () => {
        await authFetch.post(`schedule/create`, {
            body: JSON.stringify([{
                date: date.date
            }]),
            headers: {
                "Content-type": "Application/json"
            }
        }).then(data => onChange())
    }

    // deactivate date
    const handleDeactivate = async () => {
        await authFetch.delete(`schedule/${date.schedule.id}`).then(data => onChange())
    }

    const _handleActivate = e => {
        handleSelect(e)
        handleActivate()
    }

    const _handleDeactivate = e => {
        handleSelect(e)
        handleDeactivate()
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

                <Container className="p-0 d-flex justify-content-between align-items-center" fluid>
                    <Card.Text
                        style={{color: date.schedule ? date.schedule.appointment ? "var(--bs-danger)" : "var(--bs-primary)" : "var(--bs-muted)"}} 
                        className="m-0 p-0 fs-3"
                    >
                        {date.schedule ? date.schedule.appointment ? "Занято": "Доступно" : "Пусто"}
                    </Card.Text>
                    {date.schedule ?
                        <Button 
                            onClick={_handleDeactivate}
                            variant="outline-dark align-self-center" 
                            size="sm" disabled={date.schedule?.appointment}
                        >
                            Деактивувати
                        </Button>
                        :
                        <Button 
                            onClick={_handleActivate}
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
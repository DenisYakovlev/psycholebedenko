import Container from "react-bootstrap/Container"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import TextEditingTag from "../TextEditingTag/TextEditingTag"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts"
import { backend_url } from "../../constants"
import useApi from "../../hooks/useApi"


export default function CardFooter({appointment, onNotesChange, allowNotesModal}){
    // const {authFetch} = useContext(UserContext)
    const [notes, setNotes] = useState(appointment.notes)
    const {authFetch} = useApi()

    useEffect(() => {
        setNotes(appointment.notes)
    }, [appointment])

    const handleClick = () => {
        authFetch.put(`appointment/${appointment.id}`, {
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                notes: notes
            })
        })
    }

    const handleNotesChange = event => {
        const data = event.target.value

        setNotes(data)
        onNotesChange(data)
    }

    return (
        <Container className="mt-auto p-0">
            <Accordion className="app-accardion">
                <Accordion.Item eventKey="0" className="border-0 rounded-0 position-relative">
                    <Accordion.Body className="pt-5" style={{height: "450px"}}>
                        <Container className="px-1 d-flex flex-row justify-content-between align-items-center">
                            <p className="m-0 p-0 text-center fs-6 text-muted">
                                Ваші записи
                            </p>

                            {allowNotesModal && (
                                <TextEditingTag 
                                    text={notes}
                                    onChange={e => setNotes(e.target.value)}
                                />
                            )}
                        </Container>
                        <Form className="mt-3">
                            <Form.Group>
                            <Form.Control 
                                value={notes ? notes : ""} onChange={e => handleNotesChange(e)}
                                style={{height: "250px", resize: "none"}} as="textarea" placeholder="Можна не заповнювати"
                            />
                            </Form.Group>
                        </Form>
                        <Container className="m-0 p-0 d-flex justify-content-center">
                            <Button onClick={handleClick} variant="outline-dark" className="mt-4 w-50 align-self-center" size="md">
                                Зберегти
                            </Button>
                        </Container>
                    </Accordion.Body>
                    <Accordion.Header className="border-top" style={{height: "50px"}}>
                        Записки
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}
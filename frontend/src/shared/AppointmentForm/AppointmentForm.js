import { Suspense, useContext, useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { AuthModalContext, UserContext } from "../../contexts"
import LoadSpinner from "../LoadSpinner"
import { backend_url } from "../../constants"


const styles = {
    card: {
        maxWidth: "90vw",
        minWidth: "350px",
        width: "500px",
        minHeight: "80vh",
        height: "fit-content",
    }
}

export default function AppointmentForm(){
    const {user, checkPhoneVerification, authFetch} = useContext(UserContext)
    const {showAuthModal, setIndex} = useContext(AuthModalContext)
    const [notes, setNotes] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [online, setOnline] = useState(true)

    const handleSubmit = async () => {
        if(!user){
            showAuthModal()
            return 
        }

        const phoneVerified = await checkPhoneVerification()

        if(!phoneVerified){
            // skip first step of telegram auth and show phone verification form
            setIndex(1)
            showAuthModal()
            setIndex(0)
            return 
        }

        // implement appointment create
    }

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Card style={styles.card} bg="light" data-bs-theme="light" className="m-0 p-0 shadow border-0">
                <Card.Header className="p-0 mx-auto mt-5 mb-3 fs-2 fw-bold bg-light border-0">
                    Записатися на прийом
                </Card.Header>
                <Card.Body className="m-0 px-sm-5 px-3 d-flex flex-column gap-3">
                    <Form className="p-0">
                        <Form.Group className="mb-3 h-50">
                            <Form.Label className="ps-3 text-muted text-justify fs-6 ">
                                Розкажіть про себе(или что-то другое)
                            </Form.Label>
                            <Form.Control 
                                value={notes} onChange={e => setNotes(e.target.value)} 
                                as="textarea" rows={10} placeholder="Можна не заповнювати"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100">
                            <Form.Label className="ps-3 text-muted text-justify fs-6 ">
                                Оберіть бажану дату та час
                            </Form.Label>
                            <Container className="p-0 d-flex flex-row gap-3">
                                <Form.Control
                                    value={date} onChange={e => setDate(e.target.value)} 
                                    style={{width: "50%"}} type="date"/>
                                <Form.Control
                                    value={time} onChange={e => setTime(e.target.value)} 
                                    style={{width: "50%"}} type="time"/>    
                            </Container>
                        </Form.Group>
                        <Form.Group className="mb-3 w-100">
                            <Form.Label className="ps-3 text-muted text-justify fs-6 ">
                                Виберіть тип консультації
                            </Form.Label>
                            <Form.Check
                                className="ms-3" checked={online} readOnly={true}
                                value={online} onChange={e => setOnline(!online)} 
                                type="switch" label={online ? "онлайн" : "офлайн"}
                            />
                        </Form.Group>
                    </Form>
                    <Button
                        onClick={handleSubmit}
                        className="mt-5 w-50 align-self-center" variant="outline-dark" size="lg"
                    >
                        Записатися
                    </Button>
                </Card.Body>
            </Card>  
        </Suspense>
    )
}
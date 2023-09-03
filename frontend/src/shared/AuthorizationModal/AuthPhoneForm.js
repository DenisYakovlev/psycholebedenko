import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react";


export default function AuthPhoneForm({handleSubmit, setIndex}){
    const [phone, setPhone] = useState("")
    const [phoneIsValid, setPhoneIsValid] = useState(true)
    const [notify, setNotify] = useState(false)

    useEffect(() => {
        const phoneRegex = /^\+\d{12}$/
        setPhoneIsValid(phoneRegex.test(phone))
    }, [phone])

    const nextSlide = () => setIndex(2)

    const _handleSubmit = () => {
        const data = {
            phone_number: phone,
            notifications_on: notify
        }

        handleSubmit(data)
        nextSlide()
    }

    return (
        <Container style={{height: "380px"}} className="m-0 p-0">
            <Container className="p-0 m-0 mb-3 d-flex flex-column justify-content-center align-items-center">
                <p className="p-0 mt-5 mb-2 fs-2 fw-bold text-center">
                    Номер телефона
                </p>
                <p className="p-0 m-0 fs-6 text-muted text-center w-75">
                    Додайте свій номер телефона для зв'язку з психологом
                </p>
            </Container>
            <Container className="px-5 my-4 d-flex flex-column gap-3">
                <Form>
                    <Form.Group>
                        <Form.Label className="text-dark">
                            Номер телефона
                        </Form.Label>
                        <Form.Control 
                            required type="text" isInvalid={!phoneIsValid}
                            placeholder="+380" value={phone} 
                            onChange={e => setPhone(e.target.value)} />
                        <Form.Check
                            className="mt-3" type="switch"
                            label="Сповіщати мене про початок заходів"
                            value={notify}
                            onChange={() => setNotify(!notify)}
                        />
                    </Form.Group>
                </Form>
            </Container>
            <Container className="mb-4 px-5 d-flex flex-row justify-content-end gap-3">
                <Button disabled={!phoneIsValid} variant="outline-dark" size="md" onClick={_handleSubmit}>
                    Підтвердити
                </Button>
            </Container>
        </Container>
    )
}
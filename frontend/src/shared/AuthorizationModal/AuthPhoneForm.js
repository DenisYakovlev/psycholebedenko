import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useContext, useState } from "react";
import { UserContext } from "../../contexts";

const backend_url = process.env.REACT_APP_BACKEND_URL

export default function AuthPhoneForm({userData, hide, saveUser}){
    const [phone, setPhone] = useState("")
    const [notify, setNotify] = useState(false)

    const handleSubmit = () =>{
        fetch(`${backend_url}/user/me`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${userData.access}`,
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                phone_number: phone,
                notifications_on: notify
            })
        })
        .then(response => {
            if(response.status == 200){
                saveUser()
                hide()
            }
            else{
                throw new Error("User update error")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleSkip = () => {
        saveUser()
        hide()
    }

    return (
        <>
            <Container className="p-0 m-0 mb-3 d-flex flex-column justify-content-center align-items-center">
                <p className="p-0 mt-5 mb-2 fs-2 fw-bold text-center">
                    Додаткові кроки
                </p>
                <p className="p-0 m-0 fs-6 text-muted text-center w-75">
                    Текст про подключение номера телефона 
                </p>
            </Container>
            <Container className="px-5 my-4 d-flex flex-column gap-3">
                <Form>
                    <Form.Group>
                        <Form.Label className="text-dark">
                            Номер телефона
                        </Form.Label>
                        <Form.Control type="text" placeholder="+380" value={phone} onChange={e => setPhone(e.target.value)} />
                        <Form.Check
                            className="mt-3"
                            type="switch"
                            label="Сповіщати мене про початок заходів"
                            value={notify}
                            onChange={() => setNotify(!notify)}
                        />
                    </Form.Group>
                </Form>
            </Container>
            <Container className="mb-4 px-5 d-flex flex-row justify-content-end gap-3">
                <Button variant="outline-secondary" size="sm" onClick={handleSkip}>
                    Пропустити
                </Button>
                <Button variant="outline-dark" size="md" onClick={handleSubmit}>
                    Підтвердити
                </Button>
            </Container>
        </>
    )
}
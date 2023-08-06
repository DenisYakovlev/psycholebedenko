import Container from "react-bootstrap/Container"
import TelegramLoginButton from 'telegram-login-button'
import { Suspense } from "react"
import LoadSpinner from "../LoadSpinner"


const backend_url = process.env.REACT_APP_BACKEND_URL

export default function AuthTelegramForm({setUserData}){
    const handleAuthorization = async response => {
        await fetch(`${backend_url}/auth/telegram/widget`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
        })
        .then(response => response.json())
        .then(data => {
            setUserData(data)
        })
        .catch(error => console.log(error))
    }

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Container className="p-0 m-0 mb-3 d-flex flex-column justify-content-center align-items-center">
                <p className="p-0 mt-5 mb-2 fs-2 fw-bold text-center">
                    Авторизація
                </p>
                <p className="p-0 m-0 fs-6 text-muted text-center w-75">
                    Текст про подключение через телегу 
                </p>
            </Container>
            <Container fluid className="p-0 mb-5 mt-3 d-flex flex-column justify-content-center align-items-center gap-3" >
                <TelegramLoginButton 
                    className=""
                    dataOnauth={handleAuthorization} 
                    buttonSize="large" 
                    usePic={true} 
                    botName={process.env.REACT_APP_BOT_NAME}
                />
            </Container>
        </Suspense>
    )
}
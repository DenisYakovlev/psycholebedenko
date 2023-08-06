import Container from "react-bootstrap/Container"
import TelegramLoginButton from 'telegram-login-button'


export default function AuthTelegramForm({authCallback}){
    return (
        <>
            <Container style={{height: "380px"}} className="m-0 p-0 d-flex flex-column justify-content-center align-items-center">
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
                        dataOnauth={authCallback} 
                        buttonSize="large" 
                        usePic={true} 
                        botName={process.env.REACT_APP_BOT_NAME}
                    />
                </Container>
            </Container>
        </>
    )
}
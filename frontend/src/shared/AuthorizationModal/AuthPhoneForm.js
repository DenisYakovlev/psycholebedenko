import Container from "react-bootstrap/Container"
import { useState, useEffect } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { backend_ws_url, backend_url } from "../../constants"


export default function AuthPhoneForm({setIndex, userData, setUserData}){
    const { lastMessage } = 
        useWebSocket(`${backend_ws_url}/ws/bot/verification/${userData?.phoneVerificationToken}`,{
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 10,
            reconnectInterval: 1000
        })
    const nextSlide = () => setIndex(2)

    const verifyPhone = async (confirmToken) => {
        await fetch(`${backend_url}/auth/phone/verify`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${userData?.access}`
            },
            body: JSON.stringify({
                "wsToken": userData?.phoneVerificationToken,
                "confirmToken": confirmToken
            })
        })
        .then(response => {
            if(response.ok){
                setUserData({...userData, verified: true})
                nextSlide()
                return
            }

            throw new Error("Phone verification error")
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        const checkMsg = async () => {
            try{
                let data = JSON.parse(lastMessage.data)
    
                if(data.message?.confirmToken){
                    await verifyPhone(data.message.confirmToken)
                }
            }
            catch(e){
                console.log("Waiting for message")
            }
        }

        checkMsg()
    }, [lastMessage])


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
            <Container className="px-5 my-4 d-flex flex-column align-items-center justify-content-center">
                <p className="m-0 p-0 text-center fs-4 fw-bold">
                    check tg please
                </p>
            </Container>
        </Container>
    )
}
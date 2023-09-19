import Container from "react-bootstrap/Container"
import { useState, useEffect } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { backend_ws_url, backend_url } from "../../constants"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons"

import CountdownTimer from "./CountdownTimer"


export default function AuthPhoneForm({setIndex, userData, setUserData}){
    const countdownStartValue = 300

    const [countdown, setCountdown] = useState()
    const { lastMessage } = 
        useWebSocket(`${backend_ws_url}/ws/bot/verification/${userData?.tokens.phoneVerificationToken}`,{
            onOpen: (openEvent) => setCountdown(countdownStartValue),
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
                "Authorization": `Bearer ${userData?.tokens.access}`
            },
            body: JSON.stringify({
                "wsToken": userData?.tokens.phoneVerificationToken,
                "confirmToken": confirmToken
            })
        })
        .then(response => {
            if(response.ok){
                setUserData({
                    ...userData, 
                    verifications: {
                        ...userData.verifications,
                        phone: true
                    }
                })
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
                console.log("Waiting for connection")
            }
        }

        checkMsg()
    }, [lastMessage])


    const restartVerification = async () => {
        await fetch(`${backend_url}/auth/phone/retry`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${userData?.tokens.access}`
            },
            body: JSON.stringify({
                "wsToken": userData?.tokens.phoneVerificationToken,
            })
        })
        .then(response => {
            if(response.ok){
                setCountdown(countdownStartValue)
                return
            }

            throw new Error("Phone verification restart error")
        })
        .catch(error => console.log(error))
    }


    return (
        <Container style={{height: "380px"}} className="m-0 p-0">
            <Container className="p-0 m-0 mb-3 d-flex flex-column justify-content-center align-items-center">
                <p className="p-0 mt-5 fs-2 fw-bold text-center">
                    Номер телефона
                </p>

            </Container>
            <Container className="my-4 p-0 d-flex flex-column align-items-center justify-content-center gap-3">
                <FontAwesomeIcon icon={faPhoneVolume} className="fs-1"/>

                <p className="p-0 m-0 fs-6 text-muted text-center w-75">
                    Надайте свій номер телефона телеграм боту психолога для зв'язку та отримання допомоги
                </p>
            </Container>
            <Container className="p-0 mt-5 d-flex flex-column justify-content-center align-items-center">
                <CountdownTimer countdown={countdown} setCountdown={setCountdown}/>

                <p onClick={restartVerification} className="p-0 m-0 text-muted text-center hover-text">
                    повторити
                </p>
            </Container>
        </Container>
    )
}
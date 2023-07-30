import { useContext, useEffect, useState } from 'react'
import TelegramLoginButton from 'telegram-login-button'
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image"
import { UserContext } from '../../contexts'
import { Link } from 'react-router-dom'


const backend_url = process.env.REACT_APP_BACKEND_URL

const userPhotoSize = "40px"

export default function AuthWidget(){
    const {user, setUser, authFetch} = useContext(UserContext)
    const [userPhoto, setUserPhoto] = useState("")

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
            setUser(data)
            localStorage.setItem('tokens', JSON.stringify(data))
            return data
        })
        .catch(error => console.log(error))
    }

    // set user photo
    useEffect(() => {
        if(!user){
            return
        }

        authFetch(`${backend_url}/user/photo`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => setUserPhoto(data.photo_url))
        .catch(error => console.log(error))
    }, [user])

    return (
        <Container style={{width: {userPhotoSize}}} fluid className='p-0'>
            {user ?
                    <Link to="/user">
                        <Image loading="lazy" src={userPhoto} roundedCircle height={userPhotoSize}/>
                    </Link>
                : 
                <TelegramLoginButton 
                    className="mt-2"
                    dataOnauth={handleAuthorization} 
                    buttonSize="small" 
                    usePic={false} 
                    botName={process.env.REACT_APP_BOT_NAME}
                />
            }
        </Container>
    )
}
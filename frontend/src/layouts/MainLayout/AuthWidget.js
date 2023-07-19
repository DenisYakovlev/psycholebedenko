import { useContext } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image"
import { UserContext } from '../../contexts'


export default function AuthWidget(){
    const {user, setUser} = useContext(UserContext)

    const handleAuthorization = response => {
        console.log(response)
    }

    return (
        <Container fluid className='m-auto pt-2'>
            {user
                ? <Image src={user.photo_url} roundedCircle />
                : <TelegramLoginButton dataOnauth={handleAuthorization} buttonSize="medium" botName="Psycholebedenko_bot" />}
        </Container>
    )
}
import { useContext } from 'react'
import TelegramLoginButton from 'telegram-login-button'
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image"
import { UserContext } from '../../contexts'
import { Link } from 'react-router-dom'


export default function AuthWidget(){
    const {user, setUser} = useContext(UserContext)
    
    const handleAuthorization = response => {
        console.log(response)
    }

    return (
        <Container fluid className='p-0'>
            {user ? 
                <Link to="/user">
                    <Image src={user.photo_url} roundedCircle height="40px"/>
                </Link> 
                : 
                <TelegramLoginButton 
                    className="d-flex mt-1" 
                    dataOnauth={handleAuthorization} 
                    buttonSize="small" usePic={false} 
                    botName="Psycholebedenko_dev_bot" 
                />
            }
        </Container>
    )
}
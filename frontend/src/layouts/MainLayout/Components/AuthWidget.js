import { Suspense, useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image"
import { AuthModalContext, UserContext } from './../../../contexts'
import { Link } from 'react-router-dom'
import {LoadSpinner} from '../../../shared'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useApi from '../../../hooks/useApi'


const userPhotoSize = "40px"

export default function AuthWidget(){
    const {user} = useContext(UserContext)
    const {showAuthModal} = useContext(AuthModalContext)
    const [userPhoto, setUserPhoto] = useState("")
    const { authFetch } = useApi()

    // set user photo
    useEffect(() => {
        if(!user){
            return
        }

        authFetch.get('user/photo').then(data => setUserPhoto(data.photo_url))
    }, [user])

    return (
        <Suspense fallback={<LoadSpinner />}>
            {user ?
                    <Link to="/user">
                        <Image loading="lazy" src={userPhoto} roundedCircle height={userPhotoSize}/>
                    </Link>
                : 
                <>
                    <Container 
                        style={{cursor: "pointer", paddingBottom: "2px"}} 
                        onClick={showAuthModal} 
                        className="m-0 d-flex flex-row gap-2 align-items-center justify-content-center"
                    >
                        <p className="m-0 p-0 fs-6 text-muted text-justify">
                            Увійти
                        </p>
                        <FontAwesomeIcon icon={faUser}/>
                    </Container>
                </>
            }
        </Suspense>
    )
}
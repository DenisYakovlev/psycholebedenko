import { Suspense, useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image"
import { AuthModalContext, UserContext } from './../../../contexts'
import { Link } from 'react-router-dom'
import {LoadSpinner} from '../../../shared'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { backend_url } from '../../../constants'


const userPhotoSize = "40px"

export default function AuthWidget(){
    const {user, authFetch} = useContext(UserContext)
    const {showAuthModal} = useContext(AuthModalContext)
    const [userPhoto, setUserPhoto] = useState("")

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
                            увійти
                        </p>
                        <FontAwesomeIcon icon={faUser}/>
                    </Container>
                </>
            }
        </Suspense>
    )
}
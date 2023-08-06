import { Suspense, useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image"
import { UserContext } from './../../../contexts'
import { Link } from 'react-router-dom'
import {LoadSpinner, AuthorizationModal} from '../../../shared'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const backend_url = process.env.REACT_APP_BACKEND_URL

const userPhotoSize = "40px"

export default function AuthWidget(){
    const {user, authFetch} = useContext(UserContext)
    const [modalShow, setModalShow] = useState(false)
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
                        onClick={() => setModalShow(true)} 
                        className="m-0 d-flex flex-row gap-2 align-items-center justify-content-center"
                    >
                        <p className="m-0 p-0 fs-6 text-muted text-justify">
                            увійти
                        </p>
                        <FontAwesomeIcon icon={faUser}/>
                    </Container>

                    <AuthorizationModal show={modalShow} hide={() => setModalShow(false)}/>
                </>
            }
        </Suspense>
    )
}
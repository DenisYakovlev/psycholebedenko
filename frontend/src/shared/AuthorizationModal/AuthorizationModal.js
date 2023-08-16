import { useContext, useState, Suspense } from "react";
import Modal from "react-bootstrap/Modal"
import Carousel from "react-bootstrap/Carousel"
import AuthTelegramForm from "./AuthTelegramForm";
import AuthPhoneForm from "./AuthPhoneForm";
import AuthFinalForm from "./AuthFinalForm";
import { UserContext } from "../../contexts";
import LoadSpinner from "../LoadSpinner"
import { backend_url } from "../../constants"


// used in auth context to authorize user
export default function AuthorizationModal({show, hide, index, setIndex}){
    const {user, setUser, authFetch} = useContext(UserContext)
    const [userData, setUserData] = useState()

    const handleSelect = selectedIndex => setIndex(selectedIndex)

    const saveUser = () => {
        if(userData.tokens && userData.extra){
            hide()
            // delay between modal hide and user update
            // without delay hide animation is skipped
            setTimeout(() => {
                setUser(userData.tokens)
                localStorage.setItem('tokens', JSON.stringify(userData.tokens))
            }, 200)
        }
    }

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
            setUserData({...userData, tokens: data})
            setIndex(1)
        })
        .catch(error => console.log(error))
    }

    const handleExtraDataSubmit = async data =>{
        const url = `${backend_url}/user/me`
        const params = {
            method: "PUT",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(data)
        }

        // If user is signed in and have tokens use authFetch
        // to refresh tokens if needed. If he is not signed in,
        // then function needs to provide token from previous step
        const response = await (user ? authFetch(url, params) : 
                                fetch(url, {...params, headers: { ...params.headers, "Authorization": `Bearer ${userData.tokens.access}`}}))

        const _response = await response.json()
        setUserData({...userData, extra: {data}})
    }

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Modal 
                backdropClassName="m-0 p-0 w-100 h-100" 
                className="m-0 p-0"
                size="md" show={show} onHide={hide} 
                animation={true} centered
                onExit={saveUser}
            >
                <Modal.Body className="p-0 m-0">
                    <Carousel 
                        activeIndex={index} onSelect={handleSelect}
                        controls={false} indicators={false} 
                        interval={null} touch={false}
                    >
                        <Carousel.Item className="p-0">
                            <AuthTelegramForm authCallback={handleAuthorization}/>
                        </Carousel.Item>
                        <Carousel.Item className="p-0">
                            <AuthPhoneForm handleSubmit={handleExtraDataSubmit} setIndex={setIndex}/>
                        </Carousel.Item>
                        <Carousel.Item className="p-0">
                            <AuthFinalForm hide={hide}/>
                        </Carousel.Item>
                    </Carousel>
                </Modal.Body>
            </Modal>
        </Suspense>
    )
}
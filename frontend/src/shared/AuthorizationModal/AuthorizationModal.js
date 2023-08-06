import { useContext, useState, Suspense } from "react";
import Modal from "react-bootstrap/Modal"
import Carousel from "react-bootstrap/Carousel"
import AuthTelegramForm from "./AuthTelegramForm";
import AuthPhoneForm from "./AuthPhoneForm";
import AuthFinalForm from "./AuthFinalForm";
import { UserContext } from "../../contexts";
import LoadSpinner from "../LoadSpinner"
import { backend_url } from "../../constants"


export default function AuthorizationModal({show, hide, index, setIndex}){
    const {setUser} = useContext(UserContext)
    const [userData, setUserData] = useState()

    const handleSelect = selectedIndex => setIndex(selectedIndex)

    const saveUser = () => {
        if(userData){
            hide()
            // delay between modal hide and user update
            // without delay hide animation is skipped
            setTimeout(() => {
                setUser(userData)
                localStorage.setItem('tokens', JSON.stringify(userData))
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
            setUserData(data)
            setIndex(1)
        })
        .catch(error => console.log(error))
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
                            <AuthPhoneForm userData={userData} hide={hide} setIndex={setIndex}/>
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
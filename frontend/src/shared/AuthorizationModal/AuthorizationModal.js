import { useContext, useState, Suspense } from "react";
import Modal from "react-bootstrap/Modal"
import Carousel from "react-bootstrap/Carousel"
import AuthTelegramForm from "./AuthTelegramForm";
import AuthPhoneForm from "./AuthPhoneForm";
import AuthFinalForm from "./AuthFinalForm";
import { UserContext } from "../../contexts";
import LoadSpinner from "../Base/LoadSpinner"
import { backend_url } from "../../constants"
import useApi from "../../hooks/useApi";


// used in auth context to authorize user
export default function AuthorizationModal({
    show, 
    hide, 
    index, 
    setIndex, 
}){
    const {user, setUser} = useContext(UserContext)
    const [userData, setUserData] = useState(null)
    const {authFetch, baseAuthFetch, publicFetch} = useApi()

    const handleSelect = selectedIndex => setIndex(selectedIndex)

    const saveUser = () => {
        if(userData && userData.verified){
            // delay between modal hide and user update
            // without delay hide animation is skipped
            setTimeout(() => {
                const _user = {
                    access: userData.access,
                    refresh: userData.refresh
                }

                setUser(_user)
                localStorage.setItem('tokens', JSON.stringify(_user))
            }, 200)
        }
    }

    const handleAuthorization = async response => {
        await publicFetch.post(`auth/telegram/widget`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
        })
        .then(data => {
            setUserData({...userData, ...data})
            setIndex(1)
        })
    }

    const exit = () =>{
        saveUser()
        hide()
    }

    return (
        <Modal 
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="md" show={show} onHide={hide} 
            animation={true} centered
            onExited={exit}
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
                        {userData ?
                            <AuthPhoneForm setIndex={setIndex} userData={userData} setUserData={setUserData}/>
                            :
                            <></>
                        }
                    </Carousel.Item>
                    <Carousel.Item className="p-0">
                        <AuthFinalForm exit={hide} />
                    </Carousel.Item>
                </Carousel>
            </Modal.Body>
        </Modal>
    )
}
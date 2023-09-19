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
    const {authFetch, baseAuthFetch, publicFetch} = useApi()
    const {user, setUser} = useContext(UserContext)

    const [userData, setUserData] = useState({
        tokens: null,
        verifications: {
            account: false,
            phone: false
        }
    })

    const handleSelect = selectedIndex => setIndex(selectedIndex)

    const saveUser = () => {
        if(userData.verifications.account && userData.verifications.phone){
            // delay between modal hide and user update
            // without delay hide animation is skipped

            setTimeout(() => {
                const _user = {
                    access: userData.tokens.access,
                    refresh: userData.tokens.refresh
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
            const _data = {
                tokens : {
                    access: data.access,
                    refresh: data.refresh,
                    phoneVerificationToken: data.phoneVerificationToken
                },
                verifications: {
                    account: true,
                    phone: data.phoneVerificationToken ? false : true
                },
                expireDates: {
                    start: data.phoneVerificationStartTime,
                    end: data.phoneVerificationExpireTime
                }
            }

            setUserData(_data)
            setIndex(_data.verifications.phone ? 2 : 1)
        })
    }

    const exit = () =>{
        saveUser()
        hide()
        setIndex(0)
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
                        {userData.verifications.account && !userData?.verifications.phone ?
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
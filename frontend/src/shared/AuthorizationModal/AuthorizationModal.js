import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal"
import AuthTelegramForm from "./AuthTelegramForm";
import AuthPhoneForm from "./AuthPhoneForm";
import { UserContext } from "../../contexts";

export default function AuthorizationModal({show, hide}){
    const {setUser} = useContext(UserContext)
    const [userData, setUserData] = useState()

    const saveUser = () => {
        if(userData){
            setUser(userData)
            localStorage.setItem('tokens', JSON.stringify(userData))
        }
    }

    return (
        <Modal 
            backdropClassName="m-0 p-0 w-100 h-100" 
            className="m-0 p-0"
            size="md" show={show} onHide={hide} 
            animation={true} centered
            onExit={saveUser}
        >
            <Modal.Body className="p-0 m-0">
                {/* first telegram auth then phone */}
                {!userData ?
                    <AuthTelegramForm setUserData={setUserData} />
                    :
                    <AuthPhoneForm userData={userData} saveUser={saveUser} hide={hide}/>
                }
            </Modal.Body>
        </Modal>
    )
}
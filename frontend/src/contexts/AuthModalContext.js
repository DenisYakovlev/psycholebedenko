import { createContext, useState } from "react"
import { AuthorizationModal } from "../shared"


const AuthModalContext = createContext()

const AuthModalContextProvider = ({children}) => {
    const [authModalShow, setAuthModalShow] = useState(false)
    const [index, setIndex] = useState(0)

    const handleAuthModalHide = () => setAuthModalShow(false)

    const showAuthModal = () => setAuthModalShow(true)

    return (
        <AuthModalContext.Provider value={{
            authModalShow, setAuthModalShow, showAuthModal, 
            index, setIndex, 
        }}>
            {children}
            <AuthorizationModal 
                show={authModalShow} hide={handleAuthModalHide} 
                index={index} setIndex={setIndex}
            />
        </AuthModalContext.Provider>
    )
}

export {AuthModalContext, AuthModalContextProvider}
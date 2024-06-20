import { useContext } from "react"
import { UserContext } from "../../contexts"

// this page is only for testing authentication from tg web app.
export default function Bot(){

    // var tg = window.Telegram.WebApp
    const {user, setUser} = useContext(UserContext)

    const handleExit = () => {
        localStorage.removeItem('tokens')
        setUser(null)
    }

    return (
        <p className="m-0 p-0 text-break fs-6 text-dark d-flex flex-column gap-3">
            <h1 onClick={handleExit} className="m-0 p-0">
                Вийти
            </h1>
            {JSON.stringify(user)}
            {JSON.stringify(window.Telegram.WebApp)}
        </p>
    )
}
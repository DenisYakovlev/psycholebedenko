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
        <p className="m-0 p-0 pb-5 mb-5 text-break fs-6 text-dark d-flex flex-column gap-3">
            <h1 onClick={handleExit} className="m-0 p-0">
                Вийти
            </h1>
            {JSON.stringify(user)}
            <p>----------------</p>
            {JSON.stringify(window.Telegram.WebApp.initData)}
        </p>
    )
}
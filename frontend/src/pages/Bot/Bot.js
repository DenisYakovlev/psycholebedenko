import { useContext } from "react"
import { UserContext } from "../../contexts"

export default function Bot(){
    // var tg = window.Telegram.WebApp
    const {user} = useContext(UserContext)

    return (
        <p className="m-0 p-0 text-break fs-6 text-dark">
            {JSON.stringify(user)}
        </p>
    )
}
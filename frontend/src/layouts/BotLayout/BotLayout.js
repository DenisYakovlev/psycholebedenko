import { useEffect } from "react"
import { Outlet } from "react-router"
import { useNavigate } from "react-router"

export default function BotLayout(){
    let navigate = useNavigate()

    useEffect(() => {
        if(window.Telegram.WebApp.initData.length == 0){
            navigate('/')
        }
    }, [])

    return (
        <Outlet />
    )
}
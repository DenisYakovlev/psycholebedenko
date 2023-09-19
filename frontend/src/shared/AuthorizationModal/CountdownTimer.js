import { useEffect } from "react"


export default function CountdownTimer({countdown, setCountdown}){
    useEffect(() => {
        let _interval = setInterval(() => {
            if(countdown){
                setCountdown(countdown - 1)
            }
            else{
                clearInterval(_interval)
            }
        }, 1000)

        return () => clearInterval(_interval)
    })

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0')
        const seconds = String(time - minutes * 60).padStart(2, '0')

        return `${minutes}:${seconds}`
    }

    return (
        <p className="p-0 m-0 fs-5 text-muted text-center">
            {countdown ? formatTime(countdown) : '00:00'}
        </p>
    )
}
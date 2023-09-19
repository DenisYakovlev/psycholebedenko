import { useEffect, useState } from "react"
const moment = require('moment-timezone')

const timezone = 'Europe/Kiev'

export default function CountdownTimer({
    // countdown, 
    // setCountdown, 
    start,
    end
}){
    const [currentTime, setCurrentTime] = useState(() => moment().tz(timezone).unix()) 

    useEffect(() => {
        let _interval = setInterval(() => {
            const now = moment().tz(timezone).unix()
            if(now <= end){
                setCurrentTime(currentTime + 1)
            }
            else{
                setCurrentTime(-1)
                clearInterval(_interval)
            }
        }, 1000)

        return () => clearInterval(_interval)
    })

    const formatTime = (time) => {
        const totalSeconds = end - moment().tz(timezone).unix()
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
        const seconds = String(totalSeconds - minutes * 60).padStart(2, '0')

        return `${minutes}:${seconds}`
    }

    return (
        <p className="p-0 m-0 fs-5 text-muted text-center">
            {currentTime == -1 ? 'час верифікації пройшов' : formatTime(currentTime)}
        </p>
    )
}
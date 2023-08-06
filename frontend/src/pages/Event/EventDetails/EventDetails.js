import { useParams } from "react-router"

export default function EventDetails(){
    const {title} = useParams()

    return <h1>{title}</h1>
}
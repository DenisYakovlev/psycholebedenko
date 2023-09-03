import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { BaseLayoutTitle } from "../../Components"
import TitleForm from "../Update/Forms/TitleForm"
import ThumbnailTextForm from "../Update/Forms/ThumbnailTextForm"
import MainTextForm from "../Update/Forms/MainTextForm"
import DurationForm from "../Update/Forms/DurationForm"
import OnlineForm from "../Update/Forms/OnlineForm"
import AddressForm from "../Update/Forms/AddressForm"
import ZoomForm from "../Update/Forms/ZoomForm"
import DateForm from "../Update/Forms/DateForm"
import TimeForm from "../Update/Forms/TimeForm"
import ImgForm from "../Update/Forms/ImgForm"
import ResultModal from "./ResultModal"
import { useContext, useState } from "react"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"


export default function LayoutSide({event, setEvent}){
    const {authFetch} = useContext(UserContext)
    const [showResult, setShowResult] = useState(false)
    const [resultType, setResultType] = useState(null)


    const handleChange = (key, value) => {
        setEvent({...event, [key] : value})
    }

    const handleClick = () => {
        authFetch(`${backend_url}/event/create`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(event)
        })
        .then(response => {
            if(response.ok){
                setResultType("success")
                setShowResult(true)
                return response.json()
            }

            throw new Error("Admin event create post error")
        })
        .catch(error => {
            setResultType("conflict")
            setShowResult(true)
            console.log(error)
        })
    }

    return (
        <Container className="p-0" fluid>
            <ResultModal show={showResult} hide={() => setShowResult(false)} resultType={resultType}/>

            <BaseLayoutTitle>
                Параметри
            </BaseLayoutTitle>

            {event ?
            <Container className="p-0 my-3 d-flex flex-column">
                <TitleForm
                    title = {event.title}
                    onChange = {e => handleChange("title", e.target.value)} 
                />
                <ThumbnailTextForm 
                    text = {event.thumbnail_text}
                    onChange = {e => handleChange("thumbnail_text", e.target.value)}
                />
                <MainTextForm 
                    text = {event.main_text}
                    onChange = {e => handleChange("main_text", e.target.value)}
                />
                <DurationForm
                    duration = {event.duration}
                    onChange = {e => handleChange("duration", e.target.value)}
                />
                <OnlineForm
                    online = {event.online}
                    onChange = {e => handleChange("online", e.target.value == "true")}
                />
                <AddressForm 
                    address = {event.address}
                    onChange = {e => handleChange("address", e.target.value)}
                />
                <ZoomForm 
                    onChange={e => handleChange("create_zoom_link", e.target.value)}
                />
                <DateForm 
                    date = {event.date}
                    onChange = {e => handleChange("date", e)}
                />
                <TimeForm
                    date = {event.date}
                    onChange = {e => handleChange("date", e)} 
                />
                <ImgForm 
                    imgURL = {event.img_url}
                    onChange = {e => handleChange("img_url", e.target.value)}
                />

                <Container className="p-0 my-5 d-flex justify-content-center align-items-center">
                    <Button onClick={handleClick} variant="outline-dark" size="lg">
                        Створити
                    </Button>
                </Container>
            </Container>
            :
            <></>
            }
        </Container>
    )
}
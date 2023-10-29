import Container from "react-bootstrap/Container"
import { Tag } from "../../../shared"
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faUserGroup, faWifi, faUsers, faArrowUpRightFromSquare, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { formatDate } from "../../utils"
import { useNavigate } from "react-router"


export default function EventSide({event}){
    let navigate = useNavigate()

    const handleZoomRedirect = () => {
        if(event.zoom_link){
            window.open(event.zoom_link)
        }
    }

    const formatParticipationInfo = () => {
        const participantsCount = event.participants_count ? event.participants_count : "0"
        const participantsLimit = event.participants_limit ? event.participants_limit : "0"

        return `${participantsCount}/${participantsLimit} чол. записалось`
    }

    return (
        <Container style={{width: "fit-content", top: "4em"}} className="m-0 mt-md-5 mt-3 px-md-3 px-sm-5 px-5 d-flex flex-column justify-content-start position-sticky gap-2">
            <Tag icon={faClock}>
                <p className="m-0 px-1">
                    {event.duration ? event.duration + " хв." : "не вказано"}
                </p>
            </Tag>
            <Tag icon={faUserGroup}>
                <p className="m-0 px-1">
                    {formatParticipationInfo()}
                </p>
            </Tag>
            <Tag icon={event.online ? faWifi : faUsers}>
                <p className="m-0 px-1">
                    {event.online ? "онлайн" : "офлайн"}
                </p>
            </Tag>
            {event.online ?
                <Tag onClick={handleZoomRedirect} style={{cursor: "pointer"}} icon={faArrowUpRightFromSquare}>
                    <p className="m-0 px-1">
                        Посилання на зум
                    </p>
                </Tag>
                :
                <Tag icon={faLocationDot}>
                    <p className="m-0 px-1">
                        {event.address ? event.address : "адреса не вказана"}
                    </p>
                </Tag>
            }
        </Container>
    )
}
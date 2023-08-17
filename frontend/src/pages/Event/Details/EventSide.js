import Container from "react-bootstrap/Container"
import { Tag } from "../../../shared"
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faUserGroup, faWifi, faArrowUpRightFromSquare, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { formatDate } from "../../utils"


export default function EventSide({event}){
    const handleZoomRedirect = () => {
        if(event.zoom_link){
            window.open(event.zoom_link)
        }
    }

    return (
        <Container style={{width: "fit-content"}} className="m-0 mt-md-5 mt-3 px-md-3 px-sm-5 px-5 d-flex flex-column justify-content-start  gap-2">
            <Tag icon={faClock}>
                <p className="m-0 px-1">
                    {event.duration + "хв."}
                </p>
            </Tag>
            <Tag icon={faUserGroup}>
                <p className="m-0 px-1">
                    {`${event.participants_count} чол. вже записалось`}
                </p>
            </Tag>
            <Tag icon={faWifi}>
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
                        {event.address}
                    </p>
                </Tag>
            }
        </Container>
    )
}
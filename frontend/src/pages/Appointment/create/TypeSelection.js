import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tag } from "../../../shared"
import { faBookmark, faTag, faClock, faHouseLaptop, faHouse, faCircleRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

const styles = {
    card: {
        height: "fit-content",
        borderBottomLeftRadius: "0px",
        borderTopLeftRadius: "0px",
        cursor: "pointer"
    }
}

export default function TypeSelection({setOnline, nextSlide}){
    const [activeIndex, setActiveIndex] = useState()

    const handleOnlineSubmit = () => {
        setActiveIndex(0)
        setOnline(true)
        nextSlide()
    }

    const handleOfflineSubmit = () => {
        setActiveIndex(1)
        setOnline(false)
        nextSlide()
    }

    const defaultBorderColor = "var(--bs-border-color-translucent)"
    const activeBorderColor = "var(--bs-success)"

    return (
        <Container className="px-3 mt-3 d-flex flex-column gap-3">
            <p className="p-0 m-0 mb-3 text-muted text-center fs-6">
                Оберіть тип зустрічі
            </p>
            <Card 
                style={{...styles.card, borderColor: activeIndex == 0 ? activeBorderColor : defaultBorderColor}} 
                className="w-100" onClick={handleOnlineSubmit}>
                <Container className="px-3 pt-2 m-0 d-flex flex-row justify-content-between align-items-center">
                    <Tag icon={faBookmark}>
                        Онлайн зустріч
                    </Tag>
                    { activeIndex == 0 ?
                            <Tag className="m-0 p-0 text-success" icon={faCircleCheck} />
                        :
                        <Tag icon={faCircleRight} />
                    }
                </Container>
                <Card.Body className="px-3 py-2 pb-1 m-0 d-flex flex-row align-items-center justify-content-start gap-3">
                    <Tag style={{fontSize: "12px"}} icon={faTag}>
                        Ціна: 800 грн.
                    </Tag>
                    <Tag style={{fontSize: "12px"}} icon={faClock}>
                        60 хв
                    </Tag>
                    <Tag style={{fontSize: "12px"}} icon={faHouseLaptop}>
                        Zoom
                    </Tag>
                </Card.Body>
            </Card>

            <Card 
                style={{...styles.card, borderColor: activeIndex == 1 ? activeBorderColor : defaultBorderColor}} 
                className="w-100 card-option" onClick={handleOfflineSubmit}>
                <Container className="px-3 pt-2 m-0 d-flex flex-row justify-content-between align-items-center">
                    <Tag icon={faBookmark}>
                        Офлайн зустріч
                    </Tag>
                    { activeIndex == 1 ?
                        <Tag className="m-0 p-0 text-success" icon={faCircleCheck} />
                        :
                        <Tag icon={faCircleRight} />
                    }
                </Container>
                <Card.Body className="px-3 py-2 pb-1 m-0 d-flex flex-row align-items-center justify-content-start gap-3">
                    <Tag style={{fontSize: "12px"}} icon={faTag}>
                        Ціна: 800 грн.
                    </Tag>
                    <Tag style={{fontSize: "12px"}} icon={faClock}>
                        60 хв
                    </Tag>
                    <Tag style={{fontSize: "12px"}} icon={faHouse}>
                        У кабінеті
                    </Tag>
                </Card.Body>
            </Card>
        </Container>
    )
}
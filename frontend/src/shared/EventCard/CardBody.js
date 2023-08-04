import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"

export default function CardBody({event}){
    const formatDate = (eventDate) => {
        const monthsUkr = [
            "Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня",
            "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"
        ];
        
        const daysUkr = [
            "Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"
        ];

        const date = new Date(eventDate);
        const dayOfWeek = daysUkr[date.getDay()];
        const day = date.getDate();
        const month = monthsUkr[date.getMonth()];
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${dayOfWeek}, ${day} ${month} о ${hours}:${minutes}`;
        return formattedDate
    }

    return (
        <Card.Body className="p-0 px-md-5 px-4 py-md-5 py-3">
            <Container className="m-0 p-0 d-flex flex-row justify-content-between align-items-center">
                <Card.Text className="m-0 mb-1 fs-4 w-75 text-dark text-truncate">
                    {event.title}
                </Card.Text>
                <Card.Text style={{paddingRight: "12px"}} className="m-0 fs-6 text-muted text-truncate">
                    {event.online ? "online" : "offline"}
                </Card.Text>
            </Container>
            <Card.Text className="m-0 mb-1 fs-6 text-muted text-justify">
                <FontAwesomeIcon icon={faCalendarDays}/> {formatDate(event.date)}
            </Card.Text>
            <hr className="event-card-line m-0 mb-3 p-0"/>
            <Container style={{maxHeight: "150px"}} className="p-0 overflow-auto">
                <Card.Text className="m-0 fs-6 pe-2 text-muted text-justify">
                    {event.thumbnail_text}
                </Card.Text>
            </Container>
        </Card.Body>
    )
}
import Card from 'react-bootstrap/Card';

export default function EventCard({event}){
    return (
        <Card>
            <Card.Header>{event.title}</Card.Header>
            <Card.Body style={{height: "20vh", width: "30vw"}}>
                <Card.Text>
                    {event.thumbnail_text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
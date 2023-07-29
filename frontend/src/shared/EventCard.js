import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import onlineIcon from "./../assets/images/zoom-icon.png"
import offlineIcon from "./../assets/images/offline-icon.png"


const styles = {
    card: {
        height: "50vw",
        width: "50vw", 
        minWidth: "190px", 
        maxHeight: "400px", 
        maxWidth: "500px", 
        borderRadius: "15px"
    }
}

export default function EventCard({event}){
    return (
        <Card bg="light" data-bs-theme="light" style={styles.card} className='m-0'>
            <Card.Header className='fs-4 d-flex flex-row justify-content-between align-items-center'>
                <Card.Text title="Назва" className="m-0">
                    {event.title}
                </Card.Text>
                <Image 
                    title={event.online ? "онлайн" : "офлайн"} 
                    src={event.online ? onlineIcon : offlineIcon} 
                    width="24px" height="24px"
                />
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {event.thumbnail_text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {event.date}
            </Card.Footer>
        </Card>
    )
}
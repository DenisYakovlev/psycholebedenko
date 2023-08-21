import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Settings from "./Settings"
import { timeDiff } from "../../pages/utils"


export default function CardHeader({appointment, onChange, onDelete}){
    return (
        <Container className="m-0 p-0 d-flex justify-content-between align-items-center">
            <Card.Text className="m-0 p-0 text-muted fs-6">
                {appointment.outdated ? 
                    "Вже пройшло"
                    :
                    `Через ${timeDiff(appointment.date.date)}`
                }
            </Card.Text>

            <Settings appointment={appointment} onChange={onChange} onDelete={onDelete}/>
        </Container>
    )
}
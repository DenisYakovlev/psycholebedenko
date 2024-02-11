import Container from "react-bootstrap/Container"
import { AppointmentCard } from "../../../../shared"
import { BaseLayoutTitle } from "../../Components"


export default function LayoutMain({card, setCard}){

    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Вихідна картка
            </BaseLayoutTitle>

            <Container className="p-0 my-5 d-flex justify-content-center align-items-center">
                <AppointmentCard
                    appointment={card}
                    onChange={() => {}}
                    onDelete={() => {}} 
                    onNotesChange={notes => setCard({...card, notes: notes})}
                    allowNotesModal={false}
                />
            </Container>
        </Container>
    )
}
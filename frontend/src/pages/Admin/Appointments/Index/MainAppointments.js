import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { AppointmentCard } from "../../../../shared"
import { BaseLayoutTitle } from "../../Components"


export default function MainAppointments({appointments, onChange}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Консультації
            </BaseLayoutTitle>

            {appointments.length > 0 ?
                    <Row
                        className="m-0 my-3 px-3 justify-content-center overflow-auto"
                    >
                        {[...appointments].map(appointment => 
                            <Col
                                key={appointment.id}
                                className="p-3 fade-in-card" 
                                style={{minWidth: "320px", maxWidth: "350px"}}
                            >
                                <AppointmentCard
                                    appointment={appointment}
                                    onChange={() => onChange()}
                                    onDelete={() => onChange()}
                                />
                            </Col>
                        )}
                    </Row>
                    :
                    <></>
                }
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { AppointmentCard, PaginationMenu } from "../../../../shared"
import { BaseLayoutTitle } from "../../Components"


export default function MainAppointments({appointments, onChange, currentPage, setPage}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Консультації
            </BaseLayoutTitle>

            {appointments.results ?
                <Row
                    className="m-0 my-3 px-3 justify-content-center"
                >
                    {[...appointments.results].map(appointment => 
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

                    <PaginationMenu
                        paginationObj={appointments}
                        currentPage={currentPage}
                        setPage={setPage} 
                    />
                </Row>
                :
                <></>
            }
                
        </Container>
    )
}
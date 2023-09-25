import Container from "react-bootstrap/Container"
import Pagination from "react-bootstrap/Pagination"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { AppointmentCard } from "../../../../shared"
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

                    <Pagination className="p-3 d-flex justify-content-center gap-2" size="sm">
                        <Pagination.Prev
                            onClick={() => setPage(appointments.links.previous)} 
                            disabled={!appointments.links.previous}
                        />

                        {[...appointments.range].map(pageNumber => {
                            if(pageNumber == '...'){
                                return <Pagination.Item onClick={() => {}}>...</Pagination.Item>
                            }
                            else{
                                return (
                                    <Pagination.Item 
                                        onClick={() => setPage(pageNumber)}
                                        active={pageNumber == currentPage}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>)
                            }
                        })}
                        
                        <Pagination.Next 
                            onClick={() => setPage(appointments.links.next)} 
                            disabled={!appointments.links.next}
                        />
                    </Pagination>
                </Row>
                :
                <></>
            }
                
        </Container>
    )
}
import { BaseContainer, BaseTitle, LoadSpinner } from "../../../shared"
import { SchedulePanel, UsersPanel, EventPanel, AppointmentPanel } from "./PanelNavigation"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


export default function Admin(){
    return (
        <BaseContainer className="d-flex justify-content-center align-items-center" light>
            <p className="m-0 p-0 text-dark fs-1">
                Template
            </p>
        </BaseContainer>
    )
}


// <Container style={{height: "300vh", backgroundColor: "#f4f4f4"}} fluid>
        //     <BaseTitle>
        //         Адмінська панель
        //     </BaseTitle>

        //     <Row 
        //         style={{maxWidth: "100vw", width: "100%"}} 
        //         xl={4} lg={2} md={2} sm={1} xs={1}
        //         className="my-md-5 my-3 px-md-5 px-3 align-items-start"
        //     >
        //         <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
        //             <SchedulePanel />
        //         </Col>
        //         <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
        //             <UsersPanel />
        //         </Col>
        //         <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
        //             <EventPanel />
        //         </Col>
        //         <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
        //             <AppointmentPanel />
        //         </Col>
        //     </Row>
        // </Container>
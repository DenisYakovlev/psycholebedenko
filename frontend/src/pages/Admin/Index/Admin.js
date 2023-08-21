import { BaseContainer, BaseTitle, LoadSpinner } from "../../../shared"
import { SchedulePanel, UsersPanel, EventPanel, AppointmentPanel } from "./PanelNavigation"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


export default function Admin(){
    return (
        <BaseContainer light>
            <BaseTitle>
                Адмінська панель
            </BaseTitle>

            <Row 
                style={{maxWidth: "100vw", minWidth: "350px", width: "100%"}} 
                xl={4} lg={2} md={2} sm={1} xs={1}
                className="my-md-5 my-3 px-md-5 px-3 align-items-start"
            >
                <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
                    <SchedulePanel />
                </Col>
                <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
                    <UsersPanel />
                </Col>
                <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
                    <EventPanel />
                </Col>
                <Col xl={3} lg={6} md={6} sm={12} className="m-0 p-3 fade-in-card">
                    <AppointmentPanel />
                </Col>
            </Row>
        </BaseContainer>
    )
}
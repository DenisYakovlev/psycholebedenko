import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const LayoutMain = ({children}) => {
    return (
        <Row xl={2} sm={1} xs={1} className="m-0 p-0">
            {children}
        </Row>
    )
}

LayoutMain.Schedule = ({children}) => {
    return (
        <Col 
            xl={6} sm={12} xs={12} className="p-0 admin-planning-calendar-main-side"
        >
            {children}
        </Col>
    )
}

LayoutMain.Appointments = ({children}) => {
    return (
        <Col 
            xl={6} sm={12} xs={12} 
            className="p-0 py-5 admin-planning-calendar-main-appointment"
        >
            {children}
        </Col>
    )
}

export default LayoutMain
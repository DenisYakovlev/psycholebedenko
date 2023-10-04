import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


const Layout = ({children}) => {
    return (
        <Row lg={3} md={2} sm={1} xs={1} className="m-0 p-0 vh-100 justify-content-center align-items-center gap-3">
            {children}
        </Row>
    )
}


Layout.Section = ({children}) => {
    return (
        <Col style={{maxWidth: "380px", minWidth: "320px"}} className="m-0 p-3">
            {children}
        </Col>
    )
}


export default Layout
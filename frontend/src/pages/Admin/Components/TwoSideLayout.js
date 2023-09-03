import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./styles.css"


const TwoSideLayout = ({children}) => {
    return (
        <Row
            xl={2} lg={2} sm={1} xs={1}
            className="m-0 p-0"
        >
            {children}
        </Row>
    )
}

TwoSideLayout.Side = ({children}) => {
    return (
        <Col
            xl={4} lg={6} sm={12} xs={12}
            className="m-0 p-0 two-side-layout-side"
        >
            {children}
        </Col>
    )
}

TwoSideLayout.Main = ({children, sticky=false}) => {
    return (
        <Col
            xl={8} lg={6} sm={12} xs={12}
            className={`m-0 p-0 ${sticky ? "position-sticky top-0" : ""} two-side-layout-main`}
            style={{backgroundColor: "var(--bs-gray-100)"}}
        >
            {children}
        </Col>
    )
}

export default TwoSideLayout
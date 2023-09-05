import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


const PageLayout = ({children}) => {
    return (
        <Container 
            style={{
                maxWidth: "100vw", 
                minWidth: "320px", 
                width: "1200px"
            }} 
            className="m-0 p-0 pt-4 pb-5 align-self-center d-flex flex-column justify-content-center align-items-center gap-3" fluid
        >
            {children}
        </Container>
    )
}

PageLayout.CardTable = ({children}) => {
    return (
        <Row 
            style={{maxWidth: "100vw", minWidth: "350px", width: "1200px"}} 
            lg={4} md={3} sm={1} xs={1} 
            className="m-0 p-0 justify-content-around align-items-center gap-3"
        >
            {children}
        </Row>
    )
}

PageLayout.CardCell = ({children, props}) => {
    return (
        <Col 
            {...props}
            lg={3} md={4} sm={6} xs={10} 
            className="mt-3 mx-0 p-0 fade-in-card d-flex justify-content-center"
        >
            {children}
        </Col>
    )
}

export default PageLayout
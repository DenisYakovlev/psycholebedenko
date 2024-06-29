import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Offcanvas from 'react-bootstrap/Offcanvas'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./styles.css"


const TwoSideLayout = ({children, useOffCanvas=false, showSideCanvasEvent=() => {}}) => {
    return (
        <Row
            xl={2} lg={2} sm={1} xs={1}
            className="m-0 p-0"
        >
            {children}

            {useOffCanvas &&
                <Container 
                    style={{
                        backgroundColor: "var(--bs-gray-100)",
                    }}
                    className="p-2 d-sm-none d-flex w-100 justify-content-center align-items-center position-fixed fixed-bottom" 
                    fluid
                >
                    <Button variant="outline-dark" className="w-100 fs-5" onClick={showSideCanvasEvent}>
                        <FontAwesomeIcon icon={faBars} /> Меню
                    </Button>
                </Container>
            }
        </Row>
    )
}

TwoSideLayout.Side = ({children, useOffCanvas=false}) => {
    return (
        <Col
            xl={4} lg={6} sm={12} xs={12}
            className={`m-0 p-0 ${useOffCanvas && 'd-sm-block d-none'} two-side-layout-side`}
        >
            {children}
        </Col>
    )
}

TwoSideLayout.SideOffCanvas = ({children, showSideCanvas, setShowSideCanvas, confirmButton=false}) => {    
    return (
        <Offcanvas
            show={showSideCanvas} 
            onHide={() => setShowSideCanvas(false)}
            placement="bottom"
            backdrop={false}
            className="vh-100"
        >
            <Offcanvas.Header style={{borderBottom: "solid 2px var(--bs-gray-400)"}} closeButton>
                <Offcanvas.Title className="fs-4 text-muted fw-semibold">
                    Меню
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
                {children}

                {confirmButton && 
                    <Container className="p-2 bg-white position-fixed fixed-bottom" fluid>
                        <Button 
                            variant="outline-dark" 
                            className="w-100 fs-5" 
                            onClick={() => setShowSideCanvas(false)}
                        >
                            Застосувати
                        </Button>
                    </Container>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

TwoSideLayout.Main = ({children, sticky=false}) => {
    return (
        <Col
            xl={8} lg={6} sm={12} xs={12}
            className={`m-0 p-0 ${sticky ? "vh-100 position-sticky top-0 overflow-scroll" : ""} two-side-layout-main`}
            style={{backgroundColor: "var(--bs-gray-100)"}}
        >
            {children}
        </Col>
    )
}

export default TwoSideLayout
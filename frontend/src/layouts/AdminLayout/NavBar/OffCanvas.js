import Offcanvas from "react-bootstrap/Offcanvas"
import SideMenuBody from "../SideMenu/SideMenuBody"


export default function OffCanvas({show, onHide}){
    return (
        <Offcanvas
            className="w-100 h-100"
            placement="top"
            show={show} 
            onHide={onHide}
            backdrop={false}
        >
            <Offcanvas.Header className="border-bottom border-muted" closeButton>
                <Offcanvas.Title className="fs-3 text-dark fw-semibold">
                    Навігація
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
                <SideMenuBody onHide={onHide}/>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
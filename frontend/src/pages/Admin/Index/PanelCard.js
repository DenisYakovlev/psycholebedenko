import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function PanelCard({icon=null, title ="", children}){
    return (
        <Card 
            bg="light" data-bs-theme="light"
            className="m-0 p-0 shadow border-0 rounded"
        >
            <Card.Header className="m-0 p-0 py-lg-4 py-3 bg-light text-center ">
                <h2 className="m-0 p-0">
                    <FontAwesomeIcon icon={icon} className="pe-1"/> {title}
                </h2>
            </Card.Header>

            <Card.Body style={{height: "fit-content"}} className="mb-3 px-3 fs-2 d-flex flex-column gap-3">
                {children}
            </Card.Body>
        </Card>
    )
}
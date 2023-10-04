import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Tag({children, icon, ...props}){
    return (
        <Container 
            style={{width: "fit-content"}}
            className="m-0 p-0 text-muted d-flex flex-row align-items-center"
            {...props}
        >
            {icon ?
                <FontAwesomeIcon icon={icon} style={{width: "16px"}} className="pe-1"/>
                :
                <></>
            }
            {children}
        </Container>
    )
}
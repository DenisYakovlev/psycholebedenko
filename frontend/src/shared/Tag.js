import Container from "react-bootstrap/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Tag({children, icon, wrap=true, ...props}){
    return (
        <Container 
            style={{width: "fit-content"}}
            className={`m-0 p-0 text-muted ${wrap ? 'text-wrap' : 'text-nowrap'} d-flex flex-row align-items-center`}
            fluid
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
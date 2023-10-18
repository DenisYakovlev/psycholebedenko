import Container from "react-bootstrap/Container"
import SideMenuBody from "./SideMenuBody"
import "./styles.css"


export default function SideMenu(){
    return (
        <Container
            style={{
                width: "400px",
                borderRight: "solid 2px var(--bs-gray-400)",
            }}
            className="m-0 p-0 vh-100 position-sticky top-0 overflow-scroll d-flex flex-column side-menu"
            fluid
        >
            <SideMenuBody/>
        </Container>
    )
}
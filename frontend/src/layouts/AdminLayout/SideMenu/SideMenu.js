import Container from "react-bootstrap/Container"
import SideMenuBody from "./SideMenuBody"
import "./styles.css"
import { useState } from "react"


const openedWidth = "400px"
const closedWidth = "78px"

export default function SideMenu(){
    const [isOpened, setIsOpened] = useState(true)

    return (
        <Container
            style={{
                width: isOpened ? openedWidth : closedWidth,
                borderRight: "solid 2px var(--bs-gray-400)",
            }}
            className="m-0 p-0 vh-100 position-sticky top-0 overflow-hidden d-flex flex-column side-menu"
            fluid
        >
            <SideMenuBody 
                isOpened={isOpened}
                setIsOpened={setIsOpened}
            />
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import Consulting from "./Consulting"
import Events from "./Events"
import About from "./About"
import Contacts from "./Contacts"

export default function Home(){
    return (
        <Container className="p-0">
            <Consulting />
            <Events />
            <About />
            <Contacts />
        </Container>
    )
}
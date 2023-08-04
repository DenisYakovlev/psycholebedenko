import Container from "react-bootstrap/Container"
import { lazy } from "react"

const Consulting = lazy(() => import("./Consulting/Consulting"))
const Details = lazy(() => import("./Details/Details"))
const Events = lazy(() => import("./Events/Events"))
const About = lazy(() => import("./About/About"))
const Contacts = lazy(() => import("./Contacts"))

export default function Home(){
    return (
        <Container fluid className="p-0">
            <Consulting />
            <Details />
            <Events />
            <About />
            <Contacts />
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import { lazy } from "react"
import {Helmet} from "react-helmet";


const Consulting = lazy(() => import("./Consulting/Consulting"))
const Details = lazy(() => import("./Details/Details"))
const Events = lazy(() => import("./Events/Events"))
const About = lazy(() => import("./About/About"))
const Contacts = lazy(() => import("./Contacts"))

export default function Home(){
    return (
        <Container fluid className="p-0">
            <Helmet>
                <title>Psycholebedenko - особистий онлайн психолог</title>
                <meta
                    name="description"
                    content="Особистий практикуючий онлайн психолог. Відвідайте безкоштовні групові зустрічі та запишіться на особисту консультацію."
                />
            </Helmet>

            <Consulting />
            <Details />
            <Events />
            {/* <About /> */}
            {/* <Contacts /> */}
        </Container>
    )
}
import { lazy, Suspense } from "react"

import Container from "react-bootstrap/Container"
import Spinner from 'react-bootstrap/Spinner'
import Events from "./Events"
import About from "./About"
import Contacts from "./Contacts"

const Consulting = lazy(() => import("./Consulting"))

export default function Home(){
    return (
        <Container fluid className="p-0">
            <Suspense fallback={<Spinner />}>
                <Consulting />
            </Suspense>
            <Events />
            <About />
            <Contacts />
        </Container>
    )
}
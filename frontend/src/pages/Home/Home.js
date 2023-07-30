import Container from "react-bootstrap/Container"
import Spinner from 'react-bootstrap/Spinner'
import { useContext, useEffect, useState, lazy } from "react"
import { UserContext } from "../../contexts"

const Consulting = lazy(() => import("./Consulting"))
const Events = lazy(() => import("./Events"))
const About = lazy(() => import("./About"))
const Contacts = lazy(() => import("./Contacts"))

export default function Home(){
    return (
        <Container fluid className="p-0">
            <Consulting />
            <Events />
            <About />
            <Contacts />
        </Container>
    )
}
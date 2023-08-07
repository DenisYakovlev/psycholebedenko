import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import bgImage from "./../../../assets/images/bg-home-consulting.png"
import { useEffect, useState } from "react"

import "./styles.css"
import MainText from "./MainText"
import Credentials from "./Credentials"
import ConsultingButton from "./ConsultingButton"


export default function Consulting(){
    const [src, setSrc] = useState(null)

    // lazy load background image
    useEffect(() => {
        const imageLoader = new Image()
        imageLoader.src = bgImage
        imageLoader.onload = () => {setSrc(imageLoader.src)}
    }, [])

    return (
        <>
            {
            src ?
            <Container style={{
                backgroundImage: `linear-gradient(rgba(0, 0 ,0 , 0.25), rgba(0, 0, 0, 1)), url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "Cousine"
            }} className="p-0 vh-100 position-relative" fluid>
                <Row sm={1} className="p-0 m-0 h-100">
                    <Col style={{marginBottom: "7vh", width: "100%"}} className="p-0 d-flex flex-column text-light justify-content-end align-items-center">
                        <MainText />
                        <Credentials />
                        <ConsultingButton />
                    </Col>
                </Row>
            </Container> 
            :
            <Container className="p-0 vh-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border"/>
            </Container>
        }
        </>
    )
}
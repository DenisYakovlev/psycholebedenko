import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import bgImage from "./../../assets/images/bg-home-consulting.png"
import { useEffect, useState } from "react"


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
                backgroundImage: `linear-gradient(rgba(255, 255 ,255 , 0), rgba(0, 0, 0, 1)), url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} className="p-0 vh-100 position-relative" fluid>
                <Row sm={12} className="p-0 m-0 h-100">
                    <Col style={{marginTop: "-15vh"}} className="p-0 d-flex flex-column text-light justify-content-center align-items-center ">
                        <p style={{textShadow: "0px -2px 50px black" ,fontSize: "10vw"}} className="m-0">Lead text #1</p>
                        <p style={{textShadow: "0px -2px 50px black", fontSize: "5vw"}} className="m-0 mb-3">Side text #1</p>
                        <Button style={{fontSize: "3vw"}} variant="outline-light p-xl-3" size="lg">
                            Записатись
                        </Button>
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
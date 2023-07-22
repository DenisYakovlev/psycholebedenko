import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import bgNormal from "./../../assets/images/bg-new.png"
// import "./styles.css"

export default function Consulting(){
    const screenTreshold = 1200

    return (
        <Container 
            id="consulting" 
            fluid
            style={{height: "100vh"}}
            className="p-0 position-relative d-flex justify-content-center overflow-hidden"
        >
            <Image style={{height: "auto"}} className="position-absolute" src={bgNormal} />
        </Container>
    )
}

{/* <Container 
            id="consulting" 
            fluid
            style={{height: "100vh"}}
            className="p-0 position-relative d-flex justify-content-md-center align-items-md-center overflow-hidden"
        >
            {window.screen.width > screenTreshold ?
                <Image className="position-absolute" src={bgImage1}/> :
                <Image style={{height: "auto", width: "100%", minWidth: "580px"}} className="position-absolute" src={bgImage2} fluid/>
            }
        </Container> */}
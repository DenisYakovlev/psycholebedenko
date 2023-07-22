import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import bgImage from "./../../assets/images/bg-new.png"

const styles={
    wrapper: {
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(255, 255 ,255 , 0), rgba(0, 0, 0, 1)), url(${bgImage})`,
        backgroundPosition: "center"
    }
}

export default function Consulting(){
    return (
        <Container style={styles.wrapper} className="p-0 d-flex justify-content-center align-items-center" fluid>
            
        </Container>
    )
}
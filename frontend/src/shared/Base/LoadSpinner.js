import { useState, useEffect } from "react"
import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/esm/Container"


export default function LoadSpinner(){
    const threshold = 500
    const [show, setShow] = useState(false)

    // show spinner only if page load takes more that threshold value
    useEffect(() => {
        setTimeout(() => setShow(true), threshold)
    }, [])

    return (
        <Container style={{backgroundColor: "#f4f4f4"}} className="m-0 vh-100 w-100 d-flex justify-content-center align-items-center" fluid>
            {show ?
                <Spinner animation="border"/>
                :
                <></>
            }
        </Container>
    )
}
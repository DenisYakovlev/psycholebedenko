import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


const styles = {
    hr: {
        width: "120px",
        height: "2px",
        backgroundColor: "#556080",
        border: "none",
        opacity: "1"
    }
}

export default function Details(){
    return (
        <Container style={{backgroundColor: "#f4f4f4"}} className="m-0 p-0" fluid>
            <Row lg={4} sm={2} xs={1} style={{height: "fit-content", maxWidth: "1200px"}} className="m-0 py-5 mx-lg-auto">
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 className="text-dark text-truncate">
                        Header #1
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Ambitioni dedisse scripsisse iudicaretur. 
                        Cras mattis iudicium purus sit amet fermentum.
                    </p>
                </Col>
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 style={styles.header} className="text-dark text-truncate">
                        Header #2
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Ambitioni dedisse scripsisse iudicaretur. 
                        Cras mattis iudicium purus sit amet fermentum.
                    </p>
                </Col>
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 style={styles.header} className="text-dark text-truncate">
                        Header #3
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Ambitioni dedisse scripsisse iudicaretur. 
                        Cras mattis iudicium purus sit amet fermentum.
                    </p>
                </Col> 
                <Col className="m-0 p-0 px-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 style={styles.header} className="text-dark text-truncate">
                        Header #4
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Ambitioni dedisse scripsisse iudicaretur. 
                        Cras mattis iudicium purus sit amet fermentum.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
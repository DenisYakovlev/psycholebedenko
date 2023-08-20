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
                <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 className="text-dark text-justify">
                        Досвід
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Групові психологічні зустрічі.
                        Індивидуальні психологічні консультаціїї. 
                        Загальний досвід роботи: 3 роки. 
                    </p>
                </Col>
                <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 style={styles.header} className="text-dark text-justify">
                        Освіта
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Вища освіта по спеціальності психологія. <br />
                        ЧНУ ім. Петра Могили.
                    </p>
                </Col>
                <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 style={styles.header} className="text-dark text-justify">
                        Напрям 
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Інтегративний підхід. <br />
                        Когнітивно-поведінкова терапія з елементами арт-терапії.
                    </p>
                </Col> 
                <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
                    <h2 style={styles.header} className="text-dark text-justify">
                        Запити
                    </h2>
                    <hr style={styles.hr} className="m-0 mb-3"/>
                    <p className="text-muted text-justify">
                        Підвищена тривожність, 
                        надмірна емоційність, 
                        негативні переживання які впливають на психічне та фізичне здоров'я
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faShieldHeart, faCircleUser, faTag } from "@fortawesome/free-solid-svg-icons"


const DetailTag = ({icon, header, text}) => {
    return (
        <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column align-items-center g-3">
            <FontAwesomeIcon 
                icon={icon} 
                style={{fontSize: "2.5em"}} 
                className="text-dark text-center mb-1"
            />

            <h3 className="text-dark text-center">
                {header}
            </h3>

            <p className="text-muted text-center">
                {text} 
            </p>
        </Col>
    )
}

export default function Details(){
    return (
        <Container style={{backgroundColor: "#f4f4f4"}} className="m-0 p-0" fluid>
            <Row lg={4} sm={2} xs={1} style={{height: "fit-content", maxWidth: "1200px"}} className="m-0 py-5 mx-lg-auto">
                <DetailTag 
                    icon={faCheckCircle}
                    header="Надійність"
                    text="Можливість отримання допомоги в любий час у онлайн-форматі."
                />

                <DetailTag 
                    icon={faShieldHeart}
                    header="Конфіденційність"
                    text="Гарантований захист особистих данних клієнта, створення безпечного простору. "
                />

                <DetailTag 
                    icon={faCircleUser}
                    header="Індивідуальність"
                    text="Індивідуальний підхід до клієнта, з урахуванням унікальності особистості."
                />

                <DetailTag 
                    icon={faTag}
                    header="Доступність"
                    text="Розпочніть з безкоштовних групових зустрічей та онлайн консультацій."
                />
            </Row>
        </Container>
    )
}

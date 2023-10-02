import Container from "react-bootstrap/Container"
import { testsConfig } from "../../../config"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TestCard from "./TestCard"
import { BaseContainer, BaseTitle } from "../../../shared"
import { Helmet } from "react-helmet"

export default function Tests(){
    return (
        <BaseContainer light>
            <Helmet>
                <title>Тести</title>
            </Helmet>

            <BaseTitle>
                Тести
            </BaseTitle>

            <Container className="py-5 px-0" fluid="lg">
                <Row md={2} sm={1} xs={1} className="m-0 p-0 w-100">
                    {testsConfig.map(test => 
                        <Col md={6} sm={12} xs={12} className="m-0 p-3">
                            <TestCard test={test}/>
                        </Col>
                    )}
                </Row>
            </Container>
        </BaseContainer>
    )
}
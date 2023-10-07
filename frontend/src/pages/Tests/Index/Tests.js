import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TestCard from "./TestCard"
import { BaseContainer, BaseTitle } from "../../../shared"
import { Helmet } from "react-helmet"
import useApi from "../../../hooks/useApi"
import { useEffect, useState } from "react"


export default function Tests(){
    const {publicFetch} = useApi()
    const [tests, setTests] = useState({})

    useEffect(() => {
        publicFetch.get('psy_tests/').then(data => setTests(data))
    }, [])

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
                    {Object.values(tests).map(test => 
                        <Col key={test.id} md={6} sm={12} xs={12} className="m-0 p-3">
                            <TestCard test={test}/>
                        </Col>
                    )}
                </Row>
            </Container>
        </BaseContainer>
    )
}
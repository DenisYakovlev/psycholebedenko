import { BasePageLayout } from "../Components"
import Container from "react-bootstrap/Container"
import { Helmet } from "react-helmet"


export default function Admin(){
    return (
        <BasePageLayout>
            <Helmet>
                <title>Адмінська Панель</title>
            </Helmet>

            <Container className="vh-100 p-0 d-flex justify-content-center align-items-center" fluid>
                <p className="m-0 p-0 fs-1 text-dark fw-semibold text-center">
                    Тут буде швидка панель
                </p>
            </Container>
        </BasePageLayout>
    )
}
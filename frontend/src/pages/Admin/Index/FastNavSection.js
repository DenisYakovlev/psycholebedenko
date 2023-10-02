import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
const moment = require('moment')


const FastNavCard = ({header, text, link}) => {
    return (
        <Card style={{width: "320px"}} className="bg-white rounded-3 border-muted shadow">
            <Card.Body>
                <Container as={Link} to={link} className="p-0 d-flex justify-content-between align-items-center text-decoration-none" fluid>
                    <Card.Text className="m-0 p-0 text-dark fs-5 fw-bold">
                        {header}
                    </Card.Text>
                    <FontAwesomeIcon icon={faAngleRight} className="fs-1 text-dark"/>
                </Container>
                <Card.Text title={text} className="m-0 p-0 text-muted fs-6 text-truncate">
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


export default function FastNavSection(){
    const getTodayDate = () => {
        return moment().format('YYYY-MM-DD')
    }

    return (
        <Container className="p-0 d-flex flex-column justify-content-center align-items-center gap-3" fluid>
            <FastNavCard
                header="Відкрити необроблені консультації" 
                text="Відкриється сторінка з усіма необробленними консультаціями, у яких статус 'в обробці'."
                link="/admin/appointments/?status=pending&state=0"
            />

            <FastNavCard
                header="Розклад консультацій на сьогодні" 
                text="Відкриється сторінка графіка консультацій з сьогоднішньою датою."
                link={`/admin/schedule/calendar?date=${getTodayDate()}`}
            />

            <FastNavCard
                header="Шаблон картки швидкої навігації" 
                text="Опис картки"
                link="#"
            />

        </Container>
    )
}
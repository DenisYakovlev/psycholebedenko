import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "./utils";


const CheckCard = ({children, value, title, ...props}) => {
    const colorGood = "var(--bs-success)"
    const colorBad = "var(--bs-danger)"

    return (
        <Card
            style={{ borderColor: `${value == null ? colorBad : colorGood}` }} 
            className="m-0 px-3 rounded-0" data-bs-theme="light"
            {...props}
        >
            <Card.Body className="my-2 p-0">
                <Container className="m-0 p-0 d-flex flex-row justify-content-between align-items-center">
                    <Card.Text style={{fontSize: "12px"}} className="m-0 p-0 text-muted">
                        {title}
                    </Card.Text>
                    <FontAwesomeIcon 
                        icon={value == null ? faCircleXmark : faCircleCheck}
                        style={{color: value == null ? colorBad : colorGood}}
                    />
                </Container>
                {children}
            </Card.Body>
        </Card>
    )
}

export default function FinalForm({online, date, notes, setNotes, handleSubmit, setCarouselIndex}){
    return (
        <Container className="px-3 mt-3 d-flex flex-column gap-3">
            <p className="p-0 m-0 mb-3 text-muted text-center fs-6">
                Перевірте, чи все вірно
            </p>

            <CheckCard onClick={() => setCarouselIndex(0)} value={online} title="Тип зустрічі">
                <Card.Text style={{color: online == null ? "var(--bs-danger)" : "var(--bs-success)"}} className="m-0 p-0 fs-6">
                    {online == null ? "Не вибрано" : (online ? "Онлайн зустріч" : "Офлайн зустріч")}
                </Card.Text>
            </CheckCard>

            <CheckCard onClick={() => setCarouselIndex(1)} value={date} title="Дата та час зустрічі">
                <Card.Text style={{color: date == null ? "var(--bs-danger)" : "var(--bs-success)"}} className="m-0 p-0 fs-6">
                    {date == null ? "Не вибрано" : formatDate(date.date)}
                </Card.Text>
            </CheckCard>

            <Accordion
                className="m-0 rounded-0 shadow-none" data-bs-theme="light"
            >
                <Accordion.Item eventKey="0" className="m-0 p-0 border-success rounded-0">
                    <Accordion.Header style={{fontSize: "12px"}} className="m-0 p-0 text-muted">
                        Ваші записи
                    </Accordion.Header>
                    <Accordion.Body  className="my-2 p-0 overflow-auto">
                        <Form className="m-0 p-0">
                            <Form.Group>
                                <Form.Control
                                    value={notes} onChange={e => setNotes(e.target.value)}
                                    className="border-0 border-primary shadow-none"
                                    style={{height: "20vh"}} as="textarea" placeholder="Можна не заповнювати"
                                />
                            </Form.Group>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Button 
                style={{width: "fit-content"}} className="my-3 align-self-center"
                variant="outline-dark" size="md"
                disabled={!(online != null && date != null)}
                onClick={handleSubmit}
            >
                Записатися
            </Button>
        </Container>
    )
}
import Accordion from "react-bootstrap/Accordion"
import AccordionItem from "./AccordionItem"
import AccordionToggle from "./AccordionToggle"
import AccordionBody from "./AccordionBody"
import AccordionBodyItem from "./AccordionBodyItem"
import ListGroup from 'react-bootstrap/ListGroup'
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { faUser, faUsers, faCalendarDays, faComments } from "@fortawesome/free-solid-svg-icons"


export default function SideMenuBody({onHide=null}){
    return (
        <Accordion>
            <AccordionItem eventKey="0">
                <AccordionToggle eventKey="0" bordered={false} icon={faCalendarDays}>
                        <p className="m-0 px-3 text-muted fs-4">
                            Розклад
                        </p>
                    </AccordionToggle>

                    <AccordionBody>
                        <AccordionBodyItem onClick={onHide} to="/admin/schedule/calendar">
                            Календар
                        </AccordionBodyItem>

                        <AccordionBodyItem onClick={onHide} to="/admin/schedule/planning">
                            Планування
                        </AccordionBodyItem>
                    </AccordionBody>
            </AccordionItem>

            <Accordion.Item className="border-0 rounded-0" eventKey="1">
                <AccordionToggle eventKey="1" icon={faUser}>
                    <p className="m-0 px-3 text-muted fs-4">
                        Користувачі
                    </p>
                </AccordionToggle>

                <AccordionBody>
                    <AccordionBodyItem onClick={onHide} to="#">
                        Список Користувачів
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="#">
                        Редагування
                    </AccordionBodyItem>
                </AccordionBody>

            </Accordion.Item>

            <Accordion.Item className="border-0 rounded-0" eventKey="2">
                <AccordionToggle eventKey="2" icon={faUsers}>
                    <p className="m-0 px-3 text-muted fs-4">
                        Івенти
                    </p>
                </AccordionToggle>

                <AccordionBody>
                    <AccordionBodyItem onClick={onHide} to="#">
                        Список івентів
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="#">
                        Створити
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="#">
                        Редагування
                    </AccordionBodyItem>
                </AccordionBody>

            </Accordion.Item>

            <Accordion.Item className="border-0 rounded-0" eventKey="3">
                <AccordionToggle eventKey="3" icon={faComments}>
                    <p className="m-0 px-3 text-muted fs-4">
                        Консультації
                    </p>
                </AccordionToggle>

                <AccordionBody>
                    <AccordionBodyItem onClick={onHide} to="#">
                        Список консультацій
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="#">
                        Редагування
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="#">
                        Записати Користувача
                    </AccordionBodyItem>
                </AccordionBody>

            </Accordion.Item>
        </Accordion>
    )
}
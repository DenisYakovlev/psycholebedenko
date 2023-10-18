import Container from "react-bootstrap/Container"
import CloseButton from "react-bootstrap/CloseButton"
import Accordion from "react-bootstrap/Accordion"
import AccordionItem from "./AccordionItem"
import AccordionToggle from "./AccordionToggle"
import AccordionBody from "./AccordionBody"
import AccordionBodyItem from "./AccordionBodyItem"
import { faBars, faUser, faUsers, faCalendarDays, faComments, } from "@fortawesome/free-solid-svg-icons"


export default function SideMenuBody({onHide=null, isOpened=true, setIsOpened=null}){

    return (
        <Accordion>
            <Container className="p-0 d-md-block d-none">
                <AccordionItem isOpened={true} eventKey="-1">
                    {isOpened ? (
                        // Menu title with close button
                        // Not displayed on small and medium screens
                        <AccordionToggle bordedTop={false} eventKey="-1">
                            <Container fluid className="p-0 d-flex justify-content-between align-items-center">
                                <p className="m-0 p-0 text-muted fw-semibold text-truncate fs-4">
                                    Панель керування
                                </p>

                                <CloseButton 
                                    onClick={() => setIsOpened(false)}
                                    className="m-0 p-0 fs-5"
                                />
                            </Container>
                        </AccordionToggle>
                    ) : (
                        // side menu open button. This is the best way to add border
                        // without changing other components.
                        // height is aligned to section header height
                        <Container 
                            style={{
                                height: "70px",
                                borderBottom: "solid 2px var(--bs-gray-400)"
                            }}
                            className="p-0 d-flex align-items-center" 
                            onClick={() => setIsOpened(true)}
                        >
                            <AccordionToggle 
                                bordedTop={false} 
                                borderBottom={false}
                                eventKey="-1" 
                                icon={faBars}
                            />
                        </Container>
                    )}
                </AccordionItem>
            </Container>

            <AccordionItem isOpened={isOpened} eventKey="0">
                <AccordionToggle eventKey="0" icon={faCalendarDays}>
                    <p className="m-0 px-3 text-muted fs-4">
                        Розклад
                    </p>
                </AccordionToggle>

                <AccordionBody>
                    <AccordionBodyItem onClick={onHide} to="/admin/schedule/calendar">
                        Графік Консультацій
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="/admin/schedule/planning">
                        Планування Графіку
                    </AccordionBodyItem>
                </AccordionBody>
            </AccordionItem>

            <AccordionItem isOpened={isOpened} eventKey="1">
                <AccordionToggle eventKey="1" icon={faUser}>
                    <p className="m-0 px-3 text-muted fs-4">
                        Користувачі
                    </p>
                </AccordionToggle>

                <AccordionBody>
                    <AccordionBodyItem onClick={onHide} to="/admin/users/">
                        Список Користувачів
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="/admin/users/participation">
                        Список Учасників Івентів
                    </AccordionBodyItem>
                </AccordionBody>

            </AccordionItem>

            <AccordionItem isOpened={isOpened} eventKey="2">
                <AccordionToggle eventKey="2" icon={faUsers} >
                    <p className="m-0 px-3 text-muted fs-4">
                        Івенти
                    </p>
                </AccordionToggle>

                <AccordionBody>
                    <AccordionBodyItem onClick={onHide} to="/admin/events">
                        Список Зустрічей
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="/admin/events/create">
                        Створити
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="/admin/events/update">
                        Редагування
                    </AccordionBodyItem>
                </AccordionBody>

            </AccordionItem>

            <AccordionItem isOpened={isOpened} eventKey="3">
                <AccordionToggle eventKey="3" icon={faComments} >
                    <p className="m-0 px-3 text-muted fs-4">
                        Консультації
                    </p>
                </AccordionToggle>

                <AccordionBody>
                    <AccordionBodyItem onClick={onHide} to="/admin/appointments/">
                        Список Консультацій
                    </AccordionBodyItem>

                    <AccordionBodyItem onClick={onHide} to="/admin/appointments/assign">
                        Записати Користувача
                    </AccordionBodyItem>
                </AccordionBody>

            </AccordionItem>
        </Accordion>
    )
}
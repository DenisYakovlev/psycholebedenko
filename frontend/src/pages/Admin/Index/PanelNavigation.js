import PanelCard from "./PanelCard";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import { faUser, faUsers, faCalendarDays, faComments } from "@fortawesome/free-solid-svg-icons";


const PanelLink = ({to="#", children, props}) => {
    return (
        <Button 
            variant="outline-dark"
            as={Link} to={to} 
            className="m-0 p-0 
            border-0 border-bottom rounded-0 
            text-decoration-none text-justify fs-3" 
            {...props}
        >
            {children}
        </Button>
    )
}

const SchedulePanel = () => {
    return (
        <PanelCard icon={faCalendarDays} title="Розклад">
            <PanelLink to="schedule/calendar">
                Календар
            </PanelLink>
            <PanelLink to="schedule/planning">
                Планування
            </PanelLink>
        </PanelCard>
    )
}

const UsersPanel = () => {
    return (
        <PanelCard 
            icon={faUser} title="Користувачі"
        >
            <PanelLink to="/event">
                Список користувачів
            </PanelLink>
            <PanelLink to="/event">
                Редагування
            </PanelLink>
        </PanelCard>
    )
}

const EventPanel = () => {
    return (
        <PanelCard
            icon={faUsers} title="Івенти"
        >
            <PanelLink to="/event">
                Список івентів
            </PanelLink>
            <PanelLink to="/event">
                Створити
            </PanelLink>
            <PanelLink to="/event">
                Редагування
            </PanelLink>
        </PanelCard>
    )
}

const AppointmentPanel = () => {
    return (
        <PanelCard
            icon={faComments} title="Консультації"
        >
            <PanelLink to="/event">
                Список консультацій
            </PanelLink>
            <PanelLink to="/event">
                Редагування
            </PanelLink>
            <PanelLink to="/event">
                Записати користувача
            </PanelLink>
        </PanelCard>
    )
}

export {SchedulePanel, UsersPanel, EventPanel, AppointmentPanel}
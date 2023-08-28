import { BaseLayoutTitle, UserSearchFilter } from "../../Components"
import {FiltersAccordion, FiltersAccordionToggle} from "./FiltersAccordion"
import Container from "react-bootstrap/Container"
import StatusFilter from "./StatusFilter"
import DateFilters from "./DateFilters"
import { faUser, faCircleNotch, faCalendar } from "@fortawesome/free-solid-svg-icons"


export default function SideFilters({
    users,
    setUsers, 
    setSelectedUser,
    selectedStatus,
    setSelectedStatus,
    selectedState,
    setSelectedState
}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Фільтри
            </BaseLayoutTitle>

            <FiltersAccordion>
                <FiltersAccordion.Item eventKey="0">
                    <FiltersAccordionToggle icon={faUser} bordered={false} eventKey="0">
                        <FiltersAccordionToggle.Title>
                            Пошук Користувача
                        </FiltersAccordionToggle.Title>
                    </FiltersAccordionToggle>

                    <FiltersAccordion.Body>
                        <UserSearchFilter
                            users={users}
                            setUsers={setUsers}
                            setSelectedUser={user => setSelectedUser(user.id)}
                        />
                    </FiltersAccordion.Body>
                </FiltersAccordion.Item>

                <FiltersAccordion.Item eventKey="1">
                    <FiltersAccordionToggle icon={faCircleNotch} bordered eventKey="1">
                        <FiltersAccordionToggle.Title>
                            Статус Консультацій
                        </FiltersAccordionToggle.Title>
                    </FiltersAccordionToggle>
                    
                    <FiltersAccordion.Body>
                        <StatusFilter
                            statusList={selectedStatus} 
                            setStatusList={setSelectedStatus}
                        />
                    </FiltersAccordion.Body>
                </FiltersAccordion.Item>

                <FiltersAccordion.Item eventKey="2">
                    <FiltersAccordionToggle icon={faCalendar} bordered eventKey="2">
                        <FiltersAccordionToggle.Title>
                            Фільтрація по Датам
                        </FiltersAccordionToggle.Title>
                    </FiltersAccordionToggle>
                    
                    <FiltersAccordion.Body>
                        <DateFilters
                            outdated={selectedState}
                            setOutdated={setSelectedState}
                        />
                    </FiltersAccordion.Body>
                </FiltersAccordion.Item>
            </FiltersAccordion>
        </Container>
    )
}
import { BaseLayoutTitle, ObjSearchFilter } from "../../Components"
import UserMiniCard from "../../Users/Index/UserMiniCard"
import {Filters, FiltersToggle} from "../../Components/"
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

            <Filters>
                <Filters.Item eventKey="0">
                    <FiltersToggle icon={faUser} bordered={false} eventKey="0">
                        <FiltersToggle.Title>
                            Пошук Користувача
                        </FiltersToggle.Title>
                    </FiltersToggle>

                    <Filters.Body>
                        <ObjSearchFilter 
                            obj={users}
                            setObj={setUsers}
                            ObjComponent={UserMiniCard}
                            setSelectedObj={user => setSelectedUser(user.id)}
                            apiUrl="user"
                            searchPlaceholder="Введіть номер тел./юзернейм"
                        />
                    </Filters.Body>
                </Filters.Item>

                <Filters.Item eventKey="1">
                    <FiltersToggle icon={faCircleNotch} bordered eventKey="1">
                        <FiltersToggle.Title>
                            Статус Консультацій
                        </FiltersToggle.Title>
                    </FiltersToggle>
                    
                    <Filters.Body>
                        <StatusFilter
                            statusList={selectedStatus} 
                            setStatusList={setSelectedStatus}
                        />
                    </Filters.Body>
                </Filters.Item>

                <Filters.Item eventKey="2">
                    <FiltersToggle icon={faCalendar} bordered eventKey="2">
                        <FiltersToggle.Title>
                            Фільтрація по Датам
                        </FiltersToggle.Title>
                    </FiltersToggle>
                    
                    <Filters.Body>
                        <DateFilters
                            outdated={selectedState}
                            setOutdated={setSelectedState}
                        />
                    </Filters.Body>
                </Filters.Item>
            </Filters>
        </Container>
    )
}
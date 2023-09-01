import { BaseLayoutTitle, Filters, FiltersToggle } from "../../Components"
import Container from "react-bootstrap/Container"
import StatusFilters from "./StatusFilters"
import TitleFilters from "./TitleFilters"
import { faCircleNotch, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"


export default function LayoutSide({status, setStatus, title, setTitle}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Фільтри
            </BaseLayoutTitle>

            <Filters>
                <Filters.Item eventKey="0">
                    <FiltersToggle icon={faMagnifyingGlass} bordered={false} eventKey="0">
                        <FiltersToggle.Title>
                            Пошук по Назві
                        </FiltersToggle.Title>
                    </FiltersToggle>

                    <Filters.Body>
                        <TitleFilters
                            title={title}
                            setTitle={setTitle}
                        />
                    </Filters.Body>
                </Filters.Item>

                <Filters.Item eventKey="1">
                    <FiltersToggle icon={faCircleNotch} bordered eventKey="1">
                        <FiltersToggle.Title>
                            Статус Зустрічей
                        </FiltersToggle.Title>
                    </FiltersToggle>

                    <Filters.Body>
                        <StatusFilters
                            status={status}
                            setStatus={setStatus}
                        />
                    </Filters.Body>
                </Filters.Item>
            </Filters>
        </Container>
    )
}
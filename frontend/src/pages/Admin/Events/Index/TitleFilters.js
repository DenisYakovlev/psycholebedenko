import Container from "react-bootstrap/Container"
import { SearchBar } from "../../Components"
import { debounce_delay_ms } from "../../../../constants"
import { useDebouncedCallback } from "use-debounce"

export default function TitleFilters({title, setTitle}){
    const debounce = useDebouncedCallback((value) => {
        setTitle(value)
    }, debounce_delay_ms)

    return (
        <Container className="p-0 py-3" fluid>
            <p className="m-0 px-3 pb-3 text-muted text-justify fs-5">
                Введіть назву для пошуку
            </p>

            <SearchBar 
                value={title}
                onChange={debounce}
                onSubmit={setTitle}
                placeholder="Введіть назву"
            />
        </Container>
    )   
}
import Container from "react-bootstrap/Container"
import { SearchBar } from "../../Components"

export default function TitleFilters({title, setTitle}){
    return (
        <Container className="p-0 py-3" fluid>
            <p className="m-0 px-3 pb-3 text-muted text-justify fs-5">
                Введіть назву для пошуку
            </p>

            <SearchBar 
                value={title}
                onSubmit={setTitle}
                placeholder="Введіть назву"
            />
        </Container>
    )   
}
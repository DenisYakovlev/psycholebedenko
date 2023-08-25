import Container from "react-bootstrap/Container";
import { Calendar } from "../../../../shared";


export default function SideFilters({onChange, format}){
    return (
        <Container 
            className="p-0" fluid
        >
            <p className="py-3 px-0 m-0 text-center text-muted fs-4 fw-semibold border-bottom border-muted">
                Оберіть дату
            </p>

            <Container style={{maxWidth: "450px"}} className="my-5 mx-auto px-3" fluid>
                <Calendar onChange={onChange} format={format}/>
            </Container>
        </Container>
    )
}
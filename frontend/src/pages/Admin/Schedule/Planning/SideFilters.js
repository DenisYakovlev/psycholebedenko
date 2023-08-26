import Container from "react-bootstrap/Container";
import { Calendar } from "../../../../shared";
import { BaseLayoutTitle } from "../../Components";


export default function SideFilters({onChange, format}){
    return (
        <Container 
            className="p-0" fluid
        >
            <BaseLayoutTitle>
                Оберіть дату
            </BaseLayoutTitle>

            <Container style={{maxWidth: "450px"}} className="my-5 mx-auto px-3" fluid>
                <Calendar onChange={onChange} format={format}/>
            </Container>
        </Container>
    )
}
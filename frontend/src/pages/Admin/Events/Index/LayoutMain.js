import { BaseLayoutTitle } from "../../Components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import MainEventCard from "./MainEventCard";


export default function LayoutMain({events}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Групові Зустрічі
            </BaseLayoutTitle>

            {events ?
                <Row sm={1} xs={1} className="m-0 p-0 w-100 px-0 py-5 gap-5">
                    {events.map((event, idx) => {
                        return(
                            <Col key={idx} className="m-0 p-0 px-lg-5 px-3 d-flex justify-content-center">
                                <MainEventCard 
                                    event={event} 
                                    editable={true}
                                    onChange={fetch}
                                />
                            </Col>
                        )
                    })}
                </Row>
                :
                <></>
            }
        </Container>
    )
}
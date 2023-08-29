import { BaseLayoutTitle } from "../../Components"
import Container from "react-bootstrap/Container"
import UserFullCard from "./UserFullCard"


export default function LayoutMain({user}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Вибраний Користувач
            </BaseLayoutTitle>

            <Container className="my-5 p-0 d-flex justify-content-center align-items-center">
                {user ?
                    <UserFullCard userId={user}/>
                    :
                    <></>
                }
            </Container>
        </Container>
    )  
}
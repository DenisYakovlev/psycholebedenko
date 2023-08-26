import { BaseLayoutTitle } from "../../Components"
import Container from "react-bootstrap/Container"
import UserFullCard from "./UserFullCard"


export default function LayoutMain({user}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Вибраний Користувач
            </BaseLayoutTitle>

            {user ?
                <UserFullCard user={user}/>
                :
                <></>
            }
        </Container>
    )  
}
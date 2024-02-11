import Container from "react-bootstrap/Container"
import { BaseLayoutTitle } from "../../Components"
import {ObjSearchFilter} from "../../Components"
import UserMiniCard from "./UserMiniCard"


export default function LayoutSide({users, setUsers, setSelectedUser}){

    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Пошук користувачів
            </BaseLayoutTitle>

            <ObjSearchFilter 
                obj={users}
                setObj={setUsers}
                ObjComponent={UserMiniCard}
                setSelectedObj={setSelectedUser}
                apiUrl="user"
                searchPlaceholder="Введіть номер тел./юзернейм"
            />
        </Container>
    )
}
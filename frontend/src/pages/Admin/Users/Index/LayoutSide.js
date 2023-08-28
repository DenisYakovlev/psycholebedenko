import Container from "react-bootstrap/Container"
import { BaseLayoutTitle, UserSearchFilter } from "../../Components"



export default function LayoutSide({users, setUsers, setSelectedUser}){

    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Пошук користувачів
            </BaseLayoutTitle>

            <UserSearchFilter
                users={users}
                setUsers={setUsers}
                setSelectedUser={setSelectedUser} 
            />
        </Container>
    )
}
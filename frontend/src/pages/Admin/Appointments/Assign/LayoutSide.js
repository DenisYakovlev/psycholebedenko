import { BaseLayoutTitle, UserSearchFilter } from "../../Components"
import Container from "react-bootstrap/Container"


export default function LayoutSide({users, setUsers, setSelectedUser}){
    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Пошук Користувача
            </BaseLayoutTitle>

            
            <UserSearchFilter
                users={users}
                setUsers={setUsers}
                setSelectedUser={user => setSelectedUser(user.id)}
            />
        </Container>
    )
}
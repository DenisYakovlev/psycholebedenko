import UserCard from "./UserCard"
import Container from "react-bootstrap/Container"
import Pagination from "react-bootstrap/Pagination"


export default function UsersList({users, handleSearch, setSelectedUser}){
    return (
        <Container className="p-0">
            {users ?
                <Container className="p-0">
                    {Object.values(users.results).map(user => 
                        <UserCard key={user.id} user={user} setSelectedUser={setSelectedUser}/>
                    )}

                    <Pagination className="p-3 d-flex justify-content-center gap-2" size="sm">
                        <Pagination.Prev onClick={() => handleSearch(users.previous)} disabled={!users.previous}/>
                        <Pagination.Next onClick={() => handleSearch(users.next)} disabled={!users.next}/>
                    </Pagination>
                </Container>
                :
                <></>
            }
        </Container>
    )
}
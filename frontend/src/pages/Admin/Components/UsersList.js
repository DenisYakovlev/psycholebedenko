import { useRef } from "react"
import { PaginationMenu } from "../../../shared"
import UserCard from "./UserCard"
import Container from "react-bootstrap/Container"


export default function UsersList({users, handleSearch, setSelectedUser, page, setPage}){
    let selectedCard = useRef(null)

    const handleSelect = (user, cardRef) => {
        if(selectedCard.current){
            selectedCard.current.style.setProperty("color", "var(--bs-dark)", "important")
        }

        selectedCard.current = cardRef
        selectedCard.current.style.setProperty("color", "var(--bs-success)", "important")
        
        setSelectedUser(user)
    }

    const _handleSearch = url => {
        const _url = new URL(url)
        handleSearch('user' + _url.search)
    }

    return (
        <Container className="p-0">
            {users ?
                <Container className="p-0">
                    {Object.values(users.results).map(user => 
                        <UserCard 
                            key={user.id} 
                            user={user} 
                            setSelectedUser={(user, cardRef) => handleSelect(user, cardRef)}
                        />
                    )}

                    {/* <Pagination className="p-3 d-flex justify-content-center gap-2" size="sm">
                        <Pagination.Prev onClick={() => _handleSearch(users.previous)} disabled={!users.previous}/>
                        <Pagination.Next onClick={() => _handleSearch(users.next)} disabled={!users.next}/>
                    </Pagination> */}

                    <PaginationMenu 
                        paginationObj={users}
                        currentPage={page}
                        setPage={setPage}
                    />
                    
                </Container>
                :
                <></>
            }
        </Container>
    )
}
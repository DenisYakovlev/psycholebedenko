import Container from "react-bootstrap/Container"
import SearchBar from "./SearchBar"
import UsersList from "./UsersList"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import { backend_url } from "../../../constants"
import { useQueryParam, StringParam } from "use-query-params"


export default function UserSearchFilter({users, setUsers, setSelectedUser}){
    const {authFetch} = useContext(UserContext)
    const [search, setSearch] = useQueryParam('search', StringParam)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async url => {
        setIsLoading(true)

        await authFetch(url, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin User list fetch error")
        })
        .then(data => setUsers(data))
        .catch(error => console.log(error))

        setIsLoading(false)
    }

    const _handleSearch = _search => {
        setSearch(_search)
        handleSearch(`${backend_url}/user?search=${_search ? _search : ""}`)
    }

    useEffect(() => {
        _handleSearch(search)
    }, [])
    

    return (
        <Container className="p-0" fluid>
            <Container className="p-0 border-bottom border-muted">
                <SearchBar 
                    value={search} 
                    onChange={setSearch} 
                    onSubmit={_handleSearch}
                />
            </Container>

            <UsersList 
                users={users} 
                handleSearch={handleSearch} 
                setSelectedUser={setSelectedUser}
            />
        </Container>
    )
}
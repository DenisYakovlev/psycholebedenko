import Container from "react-bootstrap/Container"
import SearchBar from "./SearchBar"
import UsersList from "./UsersList"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import { backend_url } from "../../../constants"
import { useQueryParam, StringParam } from "use-query-params"
import useApi from "../../../hooks/useApi"


export default function UserSearchFilter({users, setUsers, setSelectedUser}){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [search, setSearch] = useQueryParam('search', StringParam)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async url => {
        setIsLoading(true)

        await authFetch.get(url)
        .then(data => setUsers(data))

        setIsLoading(false)
    }

    const _handleSearch = _search => {
        setSearch(_search)
        handleSearch(`user?search=${_search ? _search : ""}`)
    }

    useEffect(() => {
        _handleSearch(search)
    }, [])
    

    return (
        <Container className="p-0" fluid>
            <Container className="py-3 border-bottom border-muted">
                <SearchBar 
                    value={search} 
                    onChange={setSearch} 
                    onSubmit={_handleSearch}
                    placeholder="Введіть номер тел./юзернейм"
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
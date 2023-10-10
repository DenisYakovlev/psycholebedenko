import Container from "react-bootstrap/Container"
import SearchBar from "./SearchBar"
import UsersList from "./UsersList"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import { backend_url } from "../../../constants"
import { useQueryParam, StringParam, withDefault } from "use-query-params"
import useApi from "../../../hooks/useApi"
import qs from "query-string"


const UserListPageParam = withDefault(StringParam, "1")

export default function UserSearchFilter({users, setUsers, setSelectedUser}){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [search, setSearch] = useQueryParam('search', StringParam)
    const [userListPage, setUserListPage] = useQueryParam('user_list_page', UserListPageParam)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async url => {
        setIsLoading(true)

        await authFetch.get(url).then(data => setUsers(data))

        setIsLoading(false)
    }

    const _handleSearch = _search => {
        let query = ""

        if(search != _search){
            // if search is changed, than change search page to first
            setSearch(_search)

            query = qs.stringify({
                search: _search,
                page: 1
            })
        }
        else{
            query = qs.stringify({
                search: _search,
                page: userListPage
            })
        }

        handleSearch(`user?${query}`)
    }

    useEffect(() => {
        _handleSearch(search)
    }, [userListPage])
    

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
                page={userListPage}
                setPage={setUserListPage}
            />
        </Container>
    )
}
import Container from "react-bootstrap/Container"
import { BaseLayoutTitle } from "../../Components"
import SearchBar from "./SearchBar"
import UsersList from "./UsersList"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../contexts"
import { backend_url } from "../../../../constants"


export default function LayoutSide({users, setUsers, setSelectedUser}){
    const {authFetch} = useContext(UserContext)
    const [search, setSearch] = useState("")
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

    const _handleSearch = () => {
        handleSearch(`${backend_url}/user?search=${search}`)
    }

    useEffect(() => {
        _handleSearch()
    }, [])
    

    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Пошук користувачів
            </BaseLayoutTitle>

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
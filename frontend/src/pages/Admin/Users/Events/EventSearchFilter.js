import Container from "react-bootstrap/Container"
import { SearchBar } from "../../Components"
import { StringParam, useQueryParam } from "use-query-params"
import EventSearchList from "./EventSearchList"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../../contexts"
import { backend_url } from "../../../../constants"


export default function EventSearchFilter({events, setEvents, setSelectedEvent}){
    const {authFetch} = useContext(UserContext)
    const [search, setSearch] = useQueryParam('search', StringParam)

    const handleSearch = async url => {
        await authFetch(url, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin User search Events fetch error")
        })
        .then(data => setEvents(data))
        .catch(error => console.log(error))
    }

    const _handleSearch = _search => {
        setSearch(_search)
        handleSearch(`${backend_url}/event?search=${_search ? _search : ""}`)
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
                    placeholder="Введіть назву івенту"
                />
            </Container>

            <EventSearchList
                events={events}
                setSelectedEvent={setSelectedEvent}
            />
        </Container>
    )
}
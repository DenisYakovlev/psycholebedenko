import Container from "react-bootstrap/Container"
import { SearchBar } from "../../Components"
import { StringParam, useQueryParam } from "use-query-params"
import EventSearchList from "./EventSearchList"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../../contexts"
import { backend_url } from "../../../../constants"
import useApi from "../../../../hooks/useApi"


export default function EventSearchFilter({events, setEvents, setSelectedEvent}){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [search, setSearch] = useQueryParam('search', StringParam)

    const handleSearch = async url => {
        await authFetch.get(url).then(data => setEvents(data))
    }

    const _handleSearch = _search => {
        setSearch(_search)
        handleSearch(`event?search=${_search ? _search : ""}`)
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
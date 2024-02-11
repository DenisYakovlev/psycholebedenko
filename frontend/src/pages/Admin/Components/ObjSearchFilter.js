import Container from "react-bootstrap/Container"
import SearchBar from "./SearchBar"
import ObjList from "./ObjList"
import { debounce_delay_ms } from "../../../constants"
import { useEffect, useState } from "react"
import { useRef } from "react"
import { useQueryParam, StringParam, withDefault } from "use-query-params"
import useApi from "../../../hooks/useApi"
import qs from "query-string"
import { useDebouncedCallback } from 'use-debounce'


const SearchParam = withDefault(StringParam, "")

export default function ObjSearchFilter({obj, setObj, ObjComponent, setSelectedObj, apiUrl, searchPlaceholder = ""}){
    const {authFetch} = useApi()
    const firstRender = useRef(true)
    const [search, setSearch] = useQueryParam('search', SearchParam)
    const [page, setPage] = useState("1")

    const handleSearch = async (ignorePage = false) => {
        const query = qs.stringify({
            search: search,
            page: ignorePage ? "1" : page
        })

        const _url = `${apiUrl}?${query}`
        await authFetch.get(_url).then(data => setObj(data))
    }

    useEffect(() => {
        if(!firstRender.current){
            handleSearch()
        }
    }, [page])

    useEffect(() => {
        if(!firstRender.current){
            handleSearch(true)
        }
    }, [search])

    useEffect(() => {
        handleSearch()
        firstRender.current = false
    }, [])

    const debounced = useDebouncedCallback((value) => {
        setSearch(value)
    }, debounce_delay_ms)

    return (
        <Container className="p-0" fluid>
            <Container className="py-3 border-bottom border-muted">
                <SearchBar 
                    value={search} 
                    onChange={value => debounced(value)} 
                    onSubmit={() => handleSearch(true)}
                    placeholder={searchPlaceholder}
                />
            </Container>

            <ObjList
                obj={obj}
                ObjComponent={ObjComponent}
                setSelectedObj={setSelectedObj}
                page={page}
                setPage={setPage}
            />
        </Container>
    )
}
import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { backend_url } from "../../../../constants"
import { useQueryParam, StringParam } from "use-query-params"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../../contexts"
import { useState } from "react"
import qs from "query-string"


export default function Events(){
    const {authFetch} = useContext(UserContext)
    const [status, setStatus] = useQueryParam('status', StringParam)
    const [title, setTitle] = useQueryParam('search', StringParam)
    const [events, setEvents] = useState(null)

    const fetchEvents = () => {
        const query = {status: status, search: title}

        authFetch(`${backend_url}/event?${qs.stringify(query)}`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }
           
            throw new Error("Admin fetch events error")
        })
        .then(data => setEvents(data))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    useEffect(() => {
        fetchEvents()
    }, [status, title])

    return(
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <LayoutSide 
                        status={status}
                        setStatus={setStatus}
                        title={setStatus}
                        setTitle={setTitle}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.Main>
                    <LayoutMain 
                        events={events}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { backend_url } from "../../../../constants"
import { useQueryParam, StringParam } from "use-query-params"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../../contexts"
import { useState } from "react"
import qs from "query-string"
import useApi from "../../../../hooks/useApi"


export default function Events(){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [status, setStatus] = useQueryParam('status', StringParam)
    const [title, setTitle] = useQueryParam('search', StringParam)
    const [events, setEvents] = useState(null)

    const fetchEvents = () => {
        const query = {status: status, search: title}

        authFetch.get(`event?${qs.stringify(query)}`).then(data => setEvents(data))
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
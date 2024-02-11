import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { useQueryParam, StringParam, withDefault } from "use-query-params"
import { useEffect } from "react"
import { useState } from "react"
import qs from "query-string"
import useApi from "../../../../hooks/useApi"


const statusParam = withDefault(StringParam, 'any')

export default function Events(){
    const {authFetch} = useApi()
    const [status, setStatus] = useQueryParam("status", statusParam)
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
                        title={title}
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
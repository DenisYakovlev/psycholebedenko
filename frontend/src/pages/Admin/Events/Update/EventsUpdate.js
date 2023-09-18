import { BasePageLayout, TwoSideLayout } from "../../Components"
import { useNavigate } from "react-router"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { StringParam, useQueryParam } from "use-query-params"
import { backend_url } from "../../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../contexts"
import useApi from "../../../../hooks/useApi"


export default function EventsUpdate(){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [virtualEvent, setVirtualEvent] = useState(null)
    const [eventId, setEventId] = useQueryParam('event', StringParam)
    let navigate = useNavigate()


    const fetchEvent = () => {
        authFetch.get(`event/${eventId}`).then(data => setVirtualEvent(data))
    }


    useEffect(() => {
        if(!eventId){
            navigate('/admin/events/')
            return
        }

        fetchEvent()
        window.scroll(0, 0)
    }, [])


    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <LayoutSide 
                        event={virtualEvent}
                        setEvent={setVirtualEvent}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.Main sticky={false}>
                    <LayoutMain
                        event={virtualEvent}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
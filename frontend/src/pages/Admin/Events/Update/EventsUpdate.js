import { BasePageLayout, TwoSideLayout } from "../../Components"
import { useNavigate } from "react-router"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { StringParam, useQueryParam } from "use-query-params"
import { backend_url } from "../../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../contexts"


export default function EventsUpdate(){
    const {authFetch} = useContext(UserContext)
    const [virtualEvent, setVirtualEvent] = useState(null)
    const [eventId, setEventId] = useQueryParam('event', StringParam)
    let navigate = useNavigate()


    const fetchEvent = () => {
        authFetch(`${backend_url}/event/${eventId}`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin event update fetch error")
        })
        .then(data => setVirtualEvent(data))
        .catch(error => console.log(error))
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
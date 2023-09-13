import { StringParam, useQueryParam } from "use-query-params"
import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { useState } from "react"


export default function UserEvents(){
    const [events, setEvents] = useState(null)
    const [selectedEvent, setSelectedEvent] = useQueryParam("event", StringParam)

    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <LayoutSide 
                        events={events}
                        setEvents={setEvents}
                        setSelectedEvent={setSelectedEvent}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.Main>
                    <LayoutMain 
                        selectedEvent={selectedEvent}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
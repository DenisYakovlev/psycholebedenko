import { StringParam, useQueryParam } from "use-query-params"
import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { useState } from "react"


export default function UserEvents(){
    const [events, setEvents] = useState(null)
    const [showSideCanvas, setShowSideCanvas] = useState(false)
    const [selectedEvent, setSelectedEvent] = useQueryParam("event", StringParam)

    const updateSelectedEvent = (event) => {
        setSelectedEvent(event)
        
        // close offcanvas if it's enabled
        showSideCanvas === true && setShowSideCanvas(false)
    }

    return (
        <BasePageLayout>
            <TwoSideLayout
                useOffCanvas={true}
                showSideCanvasEvent={() => setShowSideCanvas(true)}
            >
                <TwoSideLayout.Side useOffCanvas={true}>
                    <LayoutSide 
                        events={events}
                        setEvents={setEvents}
                        setSelectedEvent={updateSelectedEvent}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.SideOffCanvas
                    showSideCanvas={showSideCanvas}
                    setShowSideCanvas={setShowSideCanvas}
                >
                    <LayoutSide 
                        events={events}
                        setEvents={setEvents}
                        setSelectedEvent={updateSelectedEvent}
                    />
                </TwoSideLayout.SideOffCanvas>

                <TwoSideLayout.Main>
                    <LayoutMain 
                        selectedEvent={selectedEvent}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { useState, useEffect } from "react"


export default function EventsCreate(){
    const [virtualEvent, setVirtualEvent] = useState({})

    useEffect(() => {
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

                <TwoSideLayout.Main sticky>
                    <LayoutMain
                        event={virtualEvent}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
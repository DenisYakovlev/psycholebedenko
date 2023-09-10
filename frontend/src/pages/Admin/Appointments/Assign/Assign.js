import { useEffect, useState } from "react"
import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { BooleanParam, JsonParam, StringParam, useQueryParams, withDefault } from "use-query-params"


export default function Assign(){
    const [virtualCard, setVirtualCard] = useQueryParams({
        user: JsonParam,
        address: StringParam,
        online: withDefault(BooleanParam, true),
        create_zoom_link: withDefault(BooleanParam, true),
        status: withDefault(StringParam, "pending"),
        date: JsonParam,
        notes: StringParam
    })


    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <LayoutSide 
                        card={virtualCard}
                        setCard={setVirtualCard}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.Main sticky>
                    <LayoutMain 
                        card={virtualCard}
                        setCard={setVirtualCard}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
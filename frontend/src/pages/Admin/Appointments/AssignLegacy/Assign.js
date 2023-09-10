import { useEffect, useState } from "react"
import { BasePageLayout, TwoSideLayout } from "../../Components"
import { useQueryParam, JsonParam, StringParam } from "use-query-params"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"


export default function Assign(){
    const [users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useQueryParam('user', StringParam)

    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <LayoutSide 
                        users={users}
                        setUsers={setUsers}
                        setSelectedUser={user => setSelectedUser(user.id)}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.Main>
                    <LayoutMain user={selectedUser}/>
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
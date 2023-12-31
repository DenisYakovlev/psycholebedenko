import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { useState } from "react"
import { useQueryParam, StringParam } from "use-query-params"


export default function Users(){
    const [users, setUsers] = useState(null)
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
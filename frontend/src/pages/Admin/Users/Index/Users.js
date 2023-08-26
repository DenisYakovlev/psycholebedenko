import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { useState } from "react"


export default function Users(){
    const [users, setUsers] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <LayoutSide 
                        users={users} 
                        setUsers={setUsers}
                        setSelectedUser={setSelectedUser}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.Main>
                    <LayoutMain user={selectedUser}/>
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
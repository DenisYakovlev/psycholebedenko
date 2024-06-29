import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import { useState } from "react"
import { useQueryParam, StringParam } from "use-query-params"


export default function Users(){
    const [users, setUsers] = useState(null)
    const [showSideCanvas, setShowSideCanvas] = useState(false)
    const [selectedUser, setSelectedUser] = useQueryParam('user', StringParam)


    const updateSelectedUser = (user) => {
        setSelectedUser(user.id)
        
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
                        users={users} 
                        setUsers={setUsers}
                        setSelectedUser={updateSelectedUser}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.SideOffCanvas
                    showSideCanvas={showSideCanvas}
                    setShowSideCanvas={setShowSideCanvas}
                >
                    <LayoutSide 
                        users={users} 
                        setUsers={setUsers}
                        setSelectedUser={updateSelectedUser}
                    />
                </TwoSideLayout.SideOffCanvas>

                <TwoSideLayout.Main>
                    <LayoutMain user={selectedUser}/>
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
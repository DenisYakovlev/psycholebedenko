import { BasePageLayout, TwoSideLayout } from "../../Components"
import { CommaArrayParam } from "../../../../shared"
import SideFilters from "./SideFilters"
import MainAppointments from "./MainAppointments"
import { useQueryParam, StringParam, BooleanParam, withDefault, NumberParam } from "use-query-params"
import { useContext, useEffect, useState } from "react"
import qs from "query-string"
import useApi from "../../../../hooks/useApi"


const statusFilterParam = withDefault(CommaArrayParam, [])
const stateFilterParam = withDefault(BooleanParam, false)
const pageFilterParam = withDefault(NumberParam, 1)

export default function Appointments(){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [users, setUsers] = useState(null)
    const [showSideCanvas, setShowSideCanvas] = useState(false)
    const [selectedUser, setSelectedUser] = useQueryParam('user', StringParam)
    const [selectedStatus, setSelectedStatus] = useQueryParam('status', statusFilterParam)
    const [selectedState, setSelectedState] = useQueryParam('state', stateFilterParam)
    const [page, setPage] = useQueryParam('page', pageFilterParam)
    const [appointments, setAppointments] = useState([])


    const fetchAppointments = async (discardPage=true) => {
        let query = {
            user: selectedUser,
            status: selectedStatus,
            outdated: selectedState,
        }

        if(!discardPage){
            query.page = page > 0 ? page : 1
        }
        else{
            setPage(undefined)
        }

        await authFetch.get(`appointment?${qs.stringify(query)}`)
        .then(data => setAppointments(data))
    }

    useEffect(() => {
        fetchAppointments()
    }, [selectedUser, selectedStatus, selectedState])

    useEffect(() => {
        fetchAppointments(false)
    }, [page])


    return (
        <BasePageLayout>
            <TwoSideLayout
                useOffCanvas={true}
                showSideCanvasEvent={() => setShowSideCanvas(true)}
            >
                <TwoSideLayout.Side useOffCanvas={true}>
                    <SideFilters 
                        users={users}
                        setUsers={setUsers}
                        setSelectedUser={setSelectedUser}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.SideOffCanvas
                    showSideCanvas={showSideCanvas}
                    setShowSideCanvas={setShowSideCanvas}
                    confirmButton
                >
                    <SideFilters 
                        users={users}
                        setUsers={setUsers}
                        setSelectedUser={setSelectedUser}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                    />
                </TwoSideLayout.SideOffCanvas>

                <TwoSideLayout.Main>
                    <MainAppointments 
                        appointments={appointments}
                        onChange={fetchAppointments}
                        currentPage={page}
                        setPage={setPage}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
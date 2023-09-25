import { BasePageLayout, TwoSideLayout } from "../../Components"
import { CommaArrayParam } from "../../../../shared"
import SideFilters from "./SideFilters"
import MainAppointments from "./MainAppointments"
import { useQueryParam, StringParam, BooleanParam, withDefault, NumberParam } from "use-query-params"
import { useContext, useEffect, useState } from "react"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
import qs from "query-string"
import useApi from "../../../../hooks/useApi"


const statusFilterParam = withDefault(CommaArrayParam, [])
const stateFilterParam = withDefault(BooleanParam, false)

export default function Appointments(){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [users, setUsers] = useState(null)
    const [selectedUser, setSelectedUser] = useQueryParam('user', StringParam)
    const [selectedStatus, setSelectedStatus] = useQueryParam('status', statusFilterParam)
    const [selectedState, setSelectedState] = useQueryParam('state', stateFilterParam)
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [appointments, setAppointments] = useState([])

    const getQueryParams = () => {
        const user = `${selectedUser ? `user=${selectedUser}&`: ""}`
        const status = `${selectedStatus.length > 0 ? `status=${[...selectedStatus].join(',')}&` : ""}`
        const state = `${selectedState != null ? `outdated=${selectedState ? "1" : "0"}&`: ""}`
        
        return `${user}${status}${state}`
    }

    const fetchAppointments = async () => {
        const query = {
            user: selectedUser,
            status: selectedStatus,
            outdated: selectedState,
            page: page > 0 ? page : 1
        }

        await authFetch.get(`appointment?${qs.stringify(query)}`)
        .then(data => setAppointments(data))
    }

    useEffect(() => {
        fetchAppointments()
    }, [selectedUser, selectedStatus, selectedState, page])


    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
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
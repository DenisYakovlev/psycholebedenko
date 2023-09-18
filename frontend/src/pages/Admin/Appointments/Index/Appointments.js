import { BasePageLayout, TwoSideLayout } from "../../Components"
import { CommaArrayParam } from "../../../../shared"
import SideFilters from "./SideFilters"
import MainAppointments from "./MainAppointments"
import { useQueryParam, StringParam, BooleanParam, withDefault } from "use-query-params"
import { useContext, useEffect, useState } from "react"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
import useApi from "../../../../hooks/useApi"


const statusFilterParam = withDefault(CommaArrayParam, [])

export default function Appointments(){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [users, setUsers] = useState(null)
    const [selectedUser, setSelectedUser] = useQueryParam('user', StringParam)
    const [selectedStatus, setSelectedStatus] = useQueryParam('status', statusFilterParam)
    const [selectedState, setSelectedState] = useQueryParam('state', BooleanParam)
    const [appointments, setAppointments] = useState([])

    const getQueryParams = () => {
        const user = `${selectedUser ? `user=${selectedUser}&`: ""}`
        const status = `${selectedStatus.length > 0 ? `status=${[...selectedStatus].join(',')}&` : ""}`
        const state = `${selectedState != null ? `outdated=${selectedState ? 1 : 0}`: ""}`
        
        return `${user}${status}${state}`
    }

    const fetchAppointments = async () => {
        const queryParams = getQueryParams()

        await authFetch.get(`appointment?${queryParams}`)
        .then(data => setAppointments(data))
    }

    useEffect(() => {
        fetchAppointments()
    }, [selectedUser, selectedStatus, selectedState])


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
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}
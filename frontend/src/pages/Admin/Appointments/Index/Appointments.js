import { BasePageLayout, TwoSideLayout } from "../../Components"
import { CommaArrayParam } from "../../../../shared"
import SideFilters from "./SideFilters"
import MainAppointments from "./MainAppointments"
import { useQueryParam, StringParam, BooleanParam, withDefault } from "use-query-params"
import { useContext, useEffect, useState } from "react"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"


const statusFilterParam = withDefault(CommaArrayParam, [])

export default function Appointments(){
    const {authFetch} = useContext(UserContext)
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

        await authFetch(`${backend_url}/appointment?${queryParams}`,{
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin appointment fetch error")
        })
        .then(data => {
            setAppointments(data)
            console.log(data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

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
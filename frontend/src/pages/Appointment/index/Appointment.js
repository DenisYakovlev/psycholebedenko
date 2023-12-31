import { Helmet } from "react-helmet"
import { backend_url } from "../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import { LoadSpinner } from "../../../shared"
import CreateCard from "./CreateCard"
import PageLayout from "./PageLayout"
import { AppointmentCard, BaseContainer, BaseTitle } from "../../../shared"
import {CommaArrayParam} from "../../../shared"
import '../styles.css'
import Filters from "./Filters"
import { StringParam, useQueryParam, withDefault } from "use-query-params"
import qs from "query-string"
import useApi from "../../../hooks/useApi"


const statusFilterParam = withDefault(CommaArrayParam, [])
const stateFilterParam = withDefault(StringParam, 'active')

export default function Appointment({source=""}){
    const {user} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [status, setStatus] = useQueryParam('status', statusFilterParam)
    const [state, setState] = useQueryParam('state', stateFilterParam)
    const { authFetch } = useApi()

    // fetch user appointemnt
    const fetchData = async() => {
        setIsLoading(true)
        const query = qs.stringify({status: status, state: state})

        authFetch.get(`user/appointments?${query}`)
        .then(data => {
            setAppointments(data)
            setIsLoading(false)
        })

    }

    // useEffect(() => {
    //     if(!user){
    //         return
    //     }

    //     fetchData()
    // }, [user])

    // refetch on state & status change
    useEffect(() => {
        if(!user){
            return
        }

        fetchData()
    }, [state, status])

    const handleChange = appointemnt => {
        const _appointments = [...appointments].map(_appointemnt => {
            if(_appointemnt.id == appointemnt.id){
                return appointemnt
            }
            return _appointemnt
        })

        setAppointments(_appointments)
    }

    const handleDelete = appointemnt => {
        // use this if appointment needs to be deleted from collection
        // let _appointments = [...appointments]
        // _appointments.splice(_appointments.findIndex(a => a.id == appointemnt.id), 1)

        const _appointments = [...appointments].map(_appointemnt => {
            if(_appointemnt.id == appointemnt.id){
                return appointemnt
            }
            return _appointemnt
        })

        setAppointments(_appointments)
    }

    return (
        <BaseContainer light>
            <Helmet>
                <title>Консультації</title>
            </Helmet>

            <BaseTitle>
                Консультації
            </BaseTitle>

            <Filters 
                state={state}
                setState={setState}
                status={status}
                setStatus={setStatus}
            />

            {isLoading ?
                <LoadSpinner />
                :
                <PageLayout>

                    <PageLayout.CardTable>
                        {appointments.map(appointment => 
                            <PageLayout.CardCell key={appointment.id}>
                                <AppointmentCard 
                                    appointment={appointment} 
                                    onChange={_appointment => handleChange(_appointment)}
                                    onDelete={_appointemnt => handleDelete(_appointemnt)}
                                />
                            </PageLayout.CardCell>
                        )}

                        <PageLayout.CardCell>
                            <CreateCard link={`/${source}/create`}/>
                        </PageLayout.CardCell>
                    </PageLayout.CardTable>
                </PageLayout>
            }

        </BaseContainer>
    )
}